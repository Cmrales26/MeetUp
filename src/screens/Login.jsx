import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useUserAuth } from "../context/AuthContex";
import { useEffect, useState } from "react";

const Login = () => {
  const [whoLogin, setWhoLogin] = useState("User");
  const { signUp, error, signUpBusiness, loading, isAuth, user } =
    useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      if (user.rol !== undefined && user.rol === "business") {
        navigate("/home/business");
      } else {
        navigate("/home");
      }
    }
  }, [isAuth, user, navigate]);

  const handleSubmit = async (values) => {
    if (whoLogin === "User") {
      let data = {
        email: values.email,
        password: values.password,
      };
      let res = await signUp(data);
      if (res.status !== undefined && res.status === 200) {
      }
    } else {
      let data = {
        name: values.name,
        password: values.password,
      };
      let res = await signUpBusiness(data);
      if (res.status !== undefined && res.status === 200) {
      }
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const initialBusinessValues = {
    name: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const businessValidationSchema = yup.object({
    name: yup.string().required(),
    password: yup.string().min(6).required(),
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      className="Login"
    >
      <Box sx={{ background: "#1c172e" }} width={600} p={4} borderRadius={1}>
        {error ? (
          <Box
            sx={{ background: "#f95668" }}
            width={"100%"}
            mb={1}
            p={1}
            borderRadius={1}
            textAlign={"center"}
          >
            {error}
          </Box>
        ) : null}
        <h2>Login As</h2>
        <Box gap={1} display={"flex"} mb={2}>
          <Typography
            variant="overline"
            style={{
              color: whoLogin === "User" ? "#1565c0" : "#fafafa",
              cursor: "pointer",
            }}
            onClick={() => setWhoLogin("User")}
          >
            User
          </Typography>

          <Typography
            variant="overline"
            style={{
              color: whoLogin === "Business" ? "#1565c0" : "#fafafa",
              cursor: "pointer",
            }}
            onClick={() => setWhoLogin("Business")}
          >
            Business
          </Typography>
        </Box>

        {whoLogin === "User" ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                  }}
                ></TextField>

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                  }}
                ></TextField>
                <Box display={"flex"} justifyContent={"flex-end"} mb={2}>
                  <Typography variant="caption">
                    Don&apos;t have a account?{" "}
                    <Link
                      to={"/Create"}
                      style={{ textDecoration: "none", color: "#1565c0" }}
                    >
                      Create One
                    </Link>
                  </Typography>
                </Box>

                <Button variant="contained" type="submit" fullWidth>
                  Login
                </Button>
              </form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={initialBusinessValues}
            validationSchema={businessValidationSchema}
            onSubmit={handleSubmit}
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
                  type="text"
                  label="Business Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                  }}
                ></TextField>

                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                  }}
                ></TextField>
                <Box display={"flex"} justifyContent={"flex-end"} mb={2}>
                  <Typography variant="caption">
                    Don&apos;t have a account?{" "}
                    <Link
                      to={"/Create"}
                      style={{ textDecoration: "none", color: "#1565c0" }}
                    >
                      Create One
                    </Link>
                  </Typography>
                </Box>

                <Button variant="contained" type="submit" fullWidth>
                  Login
                </Button>
              </form>
            )}
          </Formik>
        )}
      </Box>
    </Box>
  );
};

export default Login;
