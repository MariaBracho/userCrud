import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  TextField,
} from "@mui/material";

import useYupValidationResolver from "../../hooks/useYupResolver";
import { userFormSchema } from "../../forms/users/usersSchema";
import { getUserDefaultValues } from "../../forms/users/usersFormatters";

import { IUser, UserFormValues } from "../../shared/interfaces/users";

type Props = Omit<DialogProps, "onSubmit"> & {
  user: IUser | null;
  onSubmit: (values: UserFormValues) => void;
};

export default function UserForm({ open, onClose, user, onSubmit }: Props) {
  const resolver = useYupValidationResolver(userFormSchema);

  const { register, handleSubmit, reset } = useForm<UserFormValues>({
    resolver,
    defaultValues: getUserDefaultValues(user),
  });

  useEffect(() => {
    reset(getUserDefaultValues(user));
  }, [user]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>User details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First name"
          type="text"
          fullWidth
          variant="standard"
          {...register("name")}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Last name"
          type="text"
          fullWidth
          variant="standard"
          {...register("lastName")}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Age"
          type="number"
          fullWidth
          variant="standard"
          {...register("age")}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Phone number"
          type="tel"
          fullWidth
          variant="standard"
          {...register("phoneNumber")}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            (onClose as () => void)?.();
            reset();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit((values) => {
            onSubmit(values);
            reset();
          })}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
