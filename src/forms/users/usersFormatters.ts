import { IUser } from "../../shared/interfaces/users";

export const getUserDefaultValues = (user?: IUser | null) => {
  return {
    name: user?.name ?? "",
    lastName: user?.lastName ?? "",
    age: user?.age ?? 0,
    phoneNumber: user?.phoneNumber ?? "",
  };
};
