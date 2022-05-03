import React, { useState, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';
import { Input, Form, InputRef } from 'antd';
import ContentChat from './ContentChat';
import { useLocation } from 'react-router-dom';
import { newSocket, getID } from 'utils/utils';
import { SOCKET_ON, zoomSocket, zoomSocketEvent, zoomSocketEventTypeActive } from 'constant/socket';
import { dataChat, user, zoomState } from 'models/zoom';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ImageShow from 'components/Image';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { firebaseUploadPhoto } from 'firebaseConfig/storage';

const Layout: React.FC = () => {
  // id zoom
  const { state: id } = useLocation();

  const [form] = Form.useForm();
  const [messages, setMessages] = useState<string>('');
  const mesRef = useRef<InputRef>(null);
  const [dataMes, setDataMes] = useState<zoomState | undefined>(undefined);
  const [image, setImage] = useState<any>();
  const [imageSend, setImageSend] = useState<any>();

  useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.pre);
    };
  }, [image]);

  function handleChangeImage(e: any) {
    setImageSend(undefined);
    setImageSend(e.target.files);
    const file = e.target.files[0];
    file.pre = URL.createObjectURL(file);
    setImage(file);
  }

  async function handleSubmit() {
    let photo;
    if (messages.trim() || imageSend) {
      if (imageSend) {
        photo = await firebaseUploadPhoto(imageSend);
      }

      const data: dataChat = {
        userChat: getID(),
        message: messages,
        photo: photo ? photo : undefined,
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
      image && URL.revokeObjectURL(image.pre);
      setImage(undefined);
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
        <div className="z-20 absolute bottom-32 right-5 w-32 h-32 object-cover">
          {image && <ImageShow src={image.pre} className="max-h-32 " />}
          {image && (
            <DeleteForeverIcon
              color="error"
              onClick={() => setImage(undefined)}
              style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
            />
          )}
        </div>
        <div className=" sticky z-10 bottom-0 h-14 top-[590px]  bg-gray-200">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr  150px',
              gridGap: '20px',
              width: '100%',
              padding: '12px 23px',
            }}
          >
            <div className="w-full max-w-full m-0 relative">
              <Form.Item
                name="username"
                className="w-full max-w-full m-0 "
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
              <Form.Item name="file" className="z-20 absolute -top-[3px] right-0">
                <label htmlFor="icon-button-file">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <Input
                      style={{ display: 'none' }}
                      size="small"
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      className=" z-0"
                      onChange={handleChangeImage}
                    />
                    <PhotoCamera />
                  </IconButton>
                </label>
              </Form.Item>
            </div>

            <Form.Item className="m-0">
              <Button
                size="small"
                onClick={handleSubmit}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Layout;
