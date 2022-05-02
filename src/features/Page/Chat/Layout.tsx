import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';
import { Input, Form, Button, InputRef } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import ContentChat from './ContentChat';
import { useLocation } from 'react-router-dom';
import { newSocket } from 'utils/utils';
import { SOCKET_ON, zoomSocket, zoomSocketEvent, zoomSocketEventTypeActive } from 'constant/socket';
import { dataChat, user, zoomState } from 'models/zoom';
import { getID } from '../../../utils/utils';
import moment from 'moment';

const Layout: React.FC = () => {
  // id zoom
  const { state: id } = useLocation();

  const [form] = Form.useForm();
  const [messages, setMessages] = useState<string>('');
  const mesRef = useRef<InputRef>(null);
  const [dataMes, setDataMes] = useState<zoomState | undefined>(undefined);

  function handleSubmit() {
    if (messages.trim()) {
      const data: dataChat = {
        userChat: getID(),
        message: messages,
        createdAt: moment().format('HH:mm:ss DD-MM-YYYY'),
        updatedAt: moment().format('HH:mm:ss DD-MM-YYYY'),
      };
      newSocket.emit(
        SOCKET_ON,
        zoomSocket.chatFriend,
        id,
        zoomSocketEventTypeActive.updateActive,
        data
      );
      setMessages('');
      form.resetFields();
      mesRef.current?.focus();
    }
  }

  useEffect(() => {
    const _id: any = id;
    if (_id) {
      newSocket.emit(SOCKET_ON, zoomSocket.chatFriend, _id, zoomSocketEventTypeActive.viewActive);
      newSocket.on(zoomSocketEvent.evenChatFriend + '-' + _id.id, (data: zoomState) => {
        setDataMes(data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSocket, id]);

  return (
    <React.Fragment>
      <header className="bg-gray-300 sticky top-0 z-10 w-full overflow-hidden  h-16 flex justify-between items-center">
        <div className="ml-4 flex justify-center items-center gap-4">
          <Avatar
            alt="đây là ảnh đại diện"
            sx={{ width: 50, height: 50, zIndex: 1 }}
            src={
              dataMes &&
              (
                ((dataMes.userId1 as user)._id !== getID()
                  ? dataMes.userId1
                  : dataMes.userId2) as user
              ).avatar
            }
          />
          <div>
            <h3 className="text-xl font-bold">
              {dataMes &&
                (
                  ((dataMes.userId1 as user)._id !== getID()
                    ? dataMes.userId1
                    : dataMes.userId2) as user
                ).name}
            </h3>
            <p className="text-xs">Hoạt động</p>
          </div>
        </div>
      </header>
      <section className="h-[570px] relative">
        <div>{dataMes && <ContentChat onDataMes={dataMes} id={getID()} />}</div>
        <div className=" sticky z-10 bottom-0 h-14 top-[595px]  bg-gray-200">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 50px',
              gridGap: '10px',
              width: '100%',
              padding: '12px 23px',
            }}
          >
            <Form.Item
              name="username"
              className="w-full max-w-full m-0"
              rules={[{ required: true, message: 'Vui lòng nhập nội dung ' }]}
            >
              <Input
                className="max-w-full"
                onChange={(e) => setMessages(e.target.value)}
                placeholder="Nhập tin nhắn..."
                ref={mesRef}
                value={messages}
              />
            </Form.Item>
            <Form.Item className="m-0">
              <Button
                onClick={handleSubmit}
                type="primary"
                htmlType="button"
                icon={<SendOutlined />}
              />
            </Form.Item>
          </Form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Layout;
