import * as Yup from "yup";

export const loginvalidations = Yup.object({
  email: Yup.string().required("please enter username or email !"),
  password: Yup.string().required("password is required!"),
});

export const signupvalidations = Yup.object({
  email: Yup.string()
    .email("Email format does not match!")
    .required("please enter email !"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      "At least 8 characters, max 32 characters,  one uppercase letter, one lowercase letter, one number and one special case character"
    )
    .required("password is required"),
  cpassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password does not match with password"
    )
    .required("this field is required"),
});
