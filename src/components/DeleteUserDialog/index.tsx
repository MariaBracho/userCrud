import {
  Button,
  Dialog,
  DialogActions,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { useAppDispatch } from "../../app/hook";
import { deleteUsersListThunk } from "../../features/users/usersThunks";

type Props = Omit<DialogProps, "onClose"> & {
  users: number[];
  onClose: () => void;
};

export default function DeleteUserDialog({ open, onClose, users }: Props) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteUsersListThunk(users));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Do you want delete users?</DialogTitle>
      <DialogActions>
        <Button onClick={onClose as any}>Cancel</Button>
        <Button onClick={handleDelete}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
