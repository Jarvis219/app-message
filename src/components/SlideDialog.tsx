import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DataUser from './DataUser';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { authConfig } from '../models/user';
import { useNavigate } from 'react-router-dom';
import { createZoom } from 'service/zoom';
import { zoomState } from '../models/zoom';
import { getID, newSocket, notifyError, notifySuccess } from '../utils/utils';
import { useEffect } from 'react';
import { SOCKET_ON, zoomSocketEvent } from 'constant/socket';
import { userActions } from '../features/slice/user/userSlice';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current: users } = useAppSelector((state) => state.users);
  const [data, setData] = React.useState<authConfig[]>(
    (users as unknown as authConfig[])?.filter((user) => user._id !== getID())
  );

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    setData((users as unknown as authConfig[])?.filter((user) => user._id !== getID()));
  }, [users]);

  async function handleClick(id: string) {
    const zoom: zoomState = {
      userId1: getID(),
      userId2: id,
    };
    try {
      const { data } = await createZoom(zoom);
      newSocket.emit(SOCKET_ON, 'all', { id: zoom.userId1, uid: zoom.userId2 });

      dispatch(userActions.listUser());
      notifySuccess('Kết nối thành công');
      handleClose();
      navigate(`/chat`, { state: { id: data._id } });
    } catch (response: any) {
      notifyError(response.response.data.message);
    }
  }

  useEffect(() => {
    newSocket.on(`${zoomSocketEvent.eventGetAllMyChat}-${getID()}`, (data: zoomState[]) => {
      dispatch(userActions.listUser());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSocket]);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Tạo phòng chát
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Chọn người để chát'}</DialogTitle>
        <DialogContent>
          <List
            sx={{
              width: '100vh',
              height: '100vh',
              maxHeight: 400,
              maxWidth: 500,
              bgcolor: 'background.paper',
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {data?.map((item: authConfig, index: number) => (
              <DataUser
                key={index}
                id={item._id}
                avatar={item.avatar}
                name={item.name}
                onHandleClick={handleClick}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
