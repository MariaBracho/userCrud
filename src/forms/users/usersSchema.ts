import * as yup from "yup";

export const userFormSchema = yup.object({
  name: yup.string().required("Este campo es requerido"),
  lastName: yup.string().required("Este campo es requerido"),
  age: yup.number().required("Este campo es requerido"),
  phoneNumber: yup.string().required("Este campo es requerido"),
});
