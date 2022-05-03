import { Menu, Switch, MenuProps } from 'antd';
import { UserAddOutlined, MessageTwoTone } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { newSocket } from 'utils/utils';
import { zoomState, user } from 'models/zoom';
import { SOCKET_ON, zoomSocketEvent } from 'constant/socket';
import { getID } from 'utils/utils';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

interface avatar {
  avatar: string;
}
type MenuItem = Required<MenuProps>['items'][number] & avatar;

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  avatar?: avatar
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    avatar,
  } as unknown as MenuItem;
}

const MenuSide: React.FC = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [current, setCurrent] = React.useState('1');
  const [listChat, setListChat] = React.useState<zoomState[]>([]);
  const id = getID();
  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key !== 'profile') {
      navigate('/chat', { state: { id: e.key } });
      return;
    }
    navigate('/profile');
  };

  useEffect(() => {
    newSocket.emit(SOCKET_ON, 'all', { id });
    newSocket.on(`${zoomSocketEvent.eventGetAllMyChat}-${id}`, (data: zoomState[]) => {
      setListChat(data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSocket, id]);

  const items: MenuItem[] = [
    getItem('Bản thân', 'profile', <UserAddOutlined />),

    getItem(
      'Tin nhắn',
      'Message',
      <MessageTwoTone />,
      listChat &&
        listChat?.map((item: zoomState) =>
          getItem(
            (((item.userId1 as user)._id !== getID() ? item.userId1 : item.userId2) as user).name,
            item._id,
            <Avatar
              src={
                (((item.userId1 as user)._id !== getID() ? item.userId1 : item.userId2) as user)
                  .avatar
              }
            />
          )
        )
    ),
  ];

  return (
    <React.Fragment>
      {/* <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      /> */}
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ height: '100%', marginTop: '-4px' }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </React.Fragment>
  );
};

export default MenuSide;
