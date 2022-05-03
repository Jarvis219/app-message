import React from 'react';
import AlertDialogSlide from 'components/SlideDialog';
import { Form, Button } from 'antd';
import { Layout } from 'antd';

const Header: React.FC<any> = ({ onLogout }) => {
  return (
    <Layout.Header className="header flex items-center justify-between">
      <div className="logo h-[100] overflow-x-hidden">
        <img
          src="https://logos.textgiraffe.com/logos/logo-name/Jarvis-designstyle-pastel-m.png"
          alt="logo"
          width={120}
          height={100}
        />
      </div>
      <AlertDialogSlide />
      <Form.Item className="m-0 ">
        <Button onClick={onLogout} type="primary" htmlType="button">
          Đăng xuất
        </Button>
      </Form.Item>
    </Layout.Header>
  );
};

export default Header;
