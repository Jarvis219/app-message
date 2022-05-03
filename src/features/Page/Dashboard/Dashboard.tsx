import React, { useEffect } from 'react';
import { Layout } from 'antd';
import clsx from 'clsx';
import Styles from './Style.module.css';
import LayoutContent from '../Chat/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { pathChat, pathProfile } from 'constant/path';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/slice/auth/authSlice';
import { userActions } from 'features/slice/user/userSlice';
import MenuSide from '../../../components/SideBarMenu';
import { getID } from '../../../utils/utils';
import Profile from '../Profile/Profile';
import Header from 'components/Header';

const { Content, Sider } = Layout;

const Dashboard: React.FC = () => {
  let location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [dataLayout, setDataLayout] = React.useState<React.ReactNode>();

  useEffect(() => {
    switch (location.pathname) {
      case pathChat:
        setDataLayout(<LayoutContent />);
        break;
      case pathProfile:
        setDataLayout(<Profile />);
        break;
      default:
        break;
    }
  }, [location]);

  function handleLogout() {
    dispatch(authActions.logout());
    navigate('/login');
  }

  useEffect(() => {
    dispatch(userActions.listUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!getID()) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getID]);

  return (
    <Layout>
      <Header onLogout={handleLogout} />
      <Layout>
        <Sider width={290} className={clsx(Styles['site-layout-background'])}>
          <MenuSide />
        </Sider>
        <Layout>
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
