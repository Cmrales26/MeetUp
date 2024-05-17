import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const FormBusiness = ({ CreateBusiness }) => {
  const initialValues = {
    name: "",
    bio: "",
    fundationdate: "",
    password: "",
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required").trim(),
    bio: yup
      .string()
      .required("Bio is required")
      .min(20, "Bio must be at least 20 characters")
      .max(250, "Bio must be at most 250 characters")
      .trim(),
    fundationdate: yup
      .date()
      .default(() => new Date())
      .required("Birthdate is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
      .trim(),
  });

  const handleSubmit = async (values) => {
    let res = await CreateBusiness(values);
    console.log(res);
    if (res.status === 201) {
      // TODO: MEJORAR EL mensaje de alerta
      alert("Business successfully created");
      navigate("/login");
    }
  };

  return (
    <Box>
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
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  type="text"
                  label="Business Name * "
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
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  type="text"
                  label="Bio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  multiline={true}
                  rows={isMobile ? 3 : 5}
                  value={values.bio}
                  name="bio"
                  error={touched.bio && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  type="date"
                  label="Foundation Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.birth}
                  name="fundationdate"
                  error={touched.birth && Boolean(errors.birth)}
                  helperText={touched.birth && errors.birth}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
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
                />
              </Grid>
              <Box
                width={"100%"}
                display={"flex"}
                justifyContent={"flex-end"}
                mb={2}
              >
                <Typography variant="caption">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    style={{ textDecoration: "none", color: "#1565c0" }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
              <Button variant="contained" type="submit" fullWidth>
                Register Business
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormBusiness;
