import React, { useEffect } from 'react';
import { googleHandler } from 'firebaseConfig/authContext';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { authConfig } from '../../../models/user';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/slice/auth/authSlice';
import { useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'utils/utils';

const Google: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginSuccess, current } = useAppSelector((state) => state.auth);

  async function handleSubmit() {
    const data: any = await googleHandler();
    const { email, displayName, photoURL, uid } = data.user;

    const user: authConfig = {
      email,
      name: displayName,
      avatar: photoURL,
      uid,
    };
    dispatch(authActions.login(user));
  }

  useEffect(() => {
    if (loginSuccess) {
      setUser(current);
      navigate('/chat');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess, current]);

  return (
    <React.Fragment>
      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ mr: 2 }}
        endIcon={<GoogleIcon />}
      >
        Google
      </Button>
    </React.Fragment>
  );
};

export default Google;
