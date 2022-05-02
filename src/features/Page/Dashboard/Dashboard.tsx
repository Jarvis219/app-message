import React, { useEffect } from 'react';
import { Layout } from 'antd';
import clsx from 'clsx';
import Styles from './Style.module.css';

import { Form, Button } from 'antd';
import LayoutContent from '../Chat/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathChat } from 'constant/path';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/slice/auth/authSlice';
import AlertDialogSlide from 'components/SlideDialog';
import { userActions } from 'features/slice/user/userSlice';
import MenuSide from './SideBarMenu';

const { Header, Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginSuccess } = useAppSelector((state) => state.auth);
  const [dataLayout, setDataLayout] = React.useState<React.ReactNode>();

  useEffect(() => {
    switch (location.pathname) {
      case pathChat:
        setDataLayout(<LayoutContent />);
        break;
      default:
        break;
    }
  }, [location]);

  function handleLogout() {
    dispatch(authActions.logout());
  }

  useEffect(() => {
    dispatch(userActions.listUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loginSuccess) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess]);

  return (
    <Layout>
      <Header className="header flex items-center justify-between">
        <div className="logo" />
        <AlertDialogSlide />
        <Form.Item className="m-0 ">
          <Button onClick={handleLogout} type="primary" htmlType="button">
            Đăng xuất
          </Button>
        </Form.Item>
      </Header>
      <Layout>
        <Sider width={290} className={clsx(Styles['site-layout-background'])}>
          <MenuSide />
        </Sider>
        <Layout
          style={{
            padding: '10px',
          }}
        >
          <Content
            className={clsx(Styles['site-layout-background'])}
            style={{
              padding: '0',
              margin: '0',
              minHeight: 280,
              overflowX: 'hidden',
            }}
          >
            {dataLayout}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
