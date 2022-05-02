import React from 'react';
import { facebookHandler } from 'firebaseConfig/authContext';
import { Button } from '@mui/material';
import { authConfig } from '../../../models/user';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/slice/auth/authSlice';
import { useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from 'utils/utils';
import FacebookIcon from '@mui/icons-material/Facebook';

const Facebook: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loginSuccess, current } = useAppSelector((state) => state.auth);

  async function handleSubmit() {
    const data: any = await facebookHandler();
    console.log(data);
    const { email, displayName, photoURL, uid } = data.user;

    const user: authConfig = {
      email,
      name: displayName,
      avatar: photoURL,
      uid,
    };
    // dispatch(authActions.login(user));
  }

  React.useEffect(() => {
    if (loginSuccess) {
      setUser(current);
      navigate('/chat');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginSuccess, current]);

  return (
    <React.Fragment>
      <Button
        onClick={handleSubmit}
        variant="contained"
        fullWidth
        sx={{ ml: 2 }}
        endIcon={<FacebookIcon />}
      >
        Facebook
      </Button>
    </React.Fragment>
  );
};

export default Facebook;
