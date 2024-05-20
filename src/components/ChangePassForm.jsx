import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
const ChangePassForm = ({ ChangeUserPass, user, ChangeBusinessPass }) => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (user.rol !== "business") {
      let data = {
        ...values,
        email: user.Email,
      };
      let res = await ChangeUserPass(data);

      if (res.status !== undefined && res.status === 200) {
        alert("User Password Change");
        navigate("/home");
      }
    } else {
      let data = {
        ...values,
        name: user.Name,
      };
      let res = await ChangeBusinessPass(data);

      if (res.status !== undefined && res.status === 200) {
        alert("Business Password Change");
        navigate("/");
      }
    }
  };
  const initialValue = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object({
    password: yup.string().min(6).required(),
    newPassword: yup.string().min(6).required(),
    confirmPassword: yup
      .string()
      .min(6)
      .required()
      .oneOf([yup.ref("newPassword"), null], "Passwords must Match"),
  });

  return (
    <Box mt={2}>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              fullWidth
              type="password"
              label="Current Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              required
              autoFocus
              sx={{
                marginBottom: 2,
                "&.MuiFormLabel-root": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
              }}
            />

            <TextField
              variant="filled"
              fullWidth
              type="password"
              label="New Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword}
              name="newPassword"
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              required
              sx={{
                marginBottom: 2,
                "&.MuiFormLabel-root": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
              }}
              autoComplete="off"
            />
            <TextField
              variant="filled"
              fullWidth
              type="password"
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              required
              sx={{
                marginBottom: 2,
                "&.MuiFormLabel-root": { color: "white" },
                "& .MuiFormLabel-root": { color: "white" },
              }}
              autoComplete="off"
            />
            <Button variant="contained" type="submit" fullWidth>
              Change Password
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePassForm;
