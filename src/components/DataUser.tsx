import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface typeProps {
  id?: string;
  avatar?: string;
  name?: string;
  onHandleClick: any;
}

const DataUser = ({ id, avatar, name, onHandleClick }: typeProps) => {
  return (
    <React.Fragment>
      <ListItemButton>
        <ListItemIcon>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemIcon>
        <ListItemText primary={name} />
        <DialogActions>
          <Button onClick={() => onHandleClick(id)} variant="contained">
            Chọn
          </Button>
        </DialogActions>
      </ListItemButton>
    </React.Fragment>
  );
};

export default React.memo(DataUser);
