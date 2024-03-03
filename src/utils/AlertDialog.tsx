import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import { userService } from '../components/services/users.service';

interface AlertDialogProps {
  id: number;
  loadEmployees: () => void;
  fullName: string;
}

export default function AlertDialog({ id, loadEmployees, fullName }: AlertDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteUser = async (userId: number) => {
    try {
      await userService.deleteUser(userId);
      loadEmployees();
      toast.success('User deleted');
    } catch (error) {
      toast.error('Ups! Error');
    }
  };

  return (
    <>
      <DeleteIcon className="icon__delete" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Está seguro que desea eliminar al empleado `}
          <span style={{ fontWeight: 'Bold' }}>{fullName}</span>?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ fontSize: '10px !important' }}>
            Esta acción no se podrá deshacer, tendrá que crear el empleado nuevamente y el mismo se creará con un ID
            diferente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() => {
              handleClose();
              deleteUser(id);
            }}
            autoFocus
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
