import { useCallback, useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import UserForm from "../../components/UserForm";
import DeleteUserDialog from "../../components/DeleteUserDialog";

import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
  createUserThunk,
  getUsersListThunk,
  updateUserThunk,
} from "../../features/users/usersThunks";
import { IUser, UserFormValues } from "../../shared/interfaces/users";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name || ""} ${params.row.lastName || ""}`,
  },
];

export default function Home() {
  const [shouldOpen, setShouldOpen] = useState(false);
  const [shouldOpenDeleteUsers, setShouldOpenDeleteUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<null | IUser>(null);
  const [selectedUsersList, setSelectedUsersList] = useState<number[]>([]);

  const { data = [], loading } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersListThunk());
  }, []);

  const handleSubmit = useCallback(
    async (values: UserFormValues) => {
      if (selectedUser?.id) {
        await dispatch(updateUserThunk({ id: selectedUser?.id, ...values }));
      } else {
        await dispatch(createUserThunk(values));
      }

      setShouldOpen(false);
      setSelectedUser(null);
    },
    [dispatch, selectedUser]
  );

  const handleCreateUser = () => {
    setShouldOpen(true);
    setSelectedUser(null);
  };

  const handleDeleteUsers = () => {
    setShouldOpenDeleteUsers(true);
  };

  return (
    <Container>
      <UserForm
        user={selectedUser}
        open={shouldOpen}
        onClose={() => setShouldOpen(false)}
        onSubmit={handleSubmit}
      />
      <DeleteUserDialog
        users={selectedUsersList}
        open={shouldOpenDeleteUsers}
        onClose={() => setShouldOpenDeleteUsers(false)}
      />

      <Box display="flex" justifyContent="flex-end" marginBottom={3}>
        <Button variant="contained" onClick={handleCreateUser}>
          Create user
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          loading={loading === "pending"}
          columns={columns}
          pageSize={6}
          rowsPerPageOptions={[6]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: false }}
          onRowClick={({ row: user }) => {
            setSelectedUser(user);
            setShouldOpen(true);
          }}
          onSelectionModelChange={(params) => {
            setSelectedUsersList(params as number[]);
          }}
        />
      </Box>

      {selectedUsersList.length > 0 && (
        <Box display="flex" marginTop={3}>
          <Button variant="contained" color="error" onClick={handleDeleteUsers}>
            Delete users
          </Button>
        </Box>
      )}
    </Container>
  );
}
