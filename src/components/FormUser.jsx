import React, { useEffect, useState } from "react";
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
import { useUserAuth } from "../context/AuthContex";

const FormUser = ({ Create, IsEditing, user, UpdateUser }) => {
  const { isAuth, loading } = useUserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!IsEditing && isAuth) {
        navigate("/create");
      }
    }
  }, [IsEditing, loading, isAuth, navigate]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validationSchema =
    IsEditing && user
      ? yup.object({
          name: yup.string().required("Name is required").trim(),
          lastname: yup.string().required("Lastname is required").trim(),
          bio: yup
            .string()
            .required("Bio is required")
            .min(20, "Bio must be at least 20 characters")
            .max(250, "Bio must be at most 250 characters")
            .trim(),
          birth: yup
            .date()
            .default(() => new Date())
            .required("Birthdate is required"),
          email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
          phone: yup
            .number()
            .required("Phone number is required")
            .positive()
            .integer(),
        })
      : yup.object({
          name: yup.string().required("Name is required").trim(),
          lastname: yup.string().required("Lastname is required").trim(),
          bio: yup
            .string()
            .required("Bio is required")
            .min(20, "Bio must be at least 20 characters")
            .max(250, "Bio must be at most 250 characters")
            .trim(),
          birth: yup
            .date()
            .default(() => new Date())
            .required("Birthdate is required"),
          email: yup
            .string()
            .email("Invalid email format")
            .required("Email is required"),
          phone: yup
            .number()
            .required("Phone number is required")
            .positive()
            .integer(),
          password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
            .trim(),
        });

  const handleSubmit = async (values) => {
    if (!IsEditing) {
      let res = await Create(values);
      if (res.status === 201) {
        alert("User created");
        navigate("/login");
      }
    } else {
      let res = await UpdateUser(values, user.UserID);
      if (res.status === 200) {
        alert("User updated");
        window.location.href = "/profile";
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const initialValues =
    IsEditing && user
      ? {
          name: user.Name,
          lastname: user.LastName,
          bio: user.Bio,
          birth: user.BirthDate,
          email: user.Email,
          phone: user.Phone,
        }
      : {
          name: "",
          lastname: "",
          bio: "",
          birth: "",
          email: "",
          phone: "",
          password: "",
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
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  fullWidth
                  type="text"
                  label="Name"
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
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  fullWidth
                  type="text"
                  label="Lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastname}
                  name="lastname"
                  error={touched.lastname && Boolean(errors.lastname)}
                  helperText={touched.lastname && errors.lastname}
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
                  label="Birthdate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.birth}
                  name="birth"
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

              <Grid item xs={12} sm={6}>
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
                  disabled={IsEditing ? true : false}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                    "& .Mui-disabled": { color: "white" },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="filled"
                  fullWidth
                  type="text"
                  label="Phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  name="phone"
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                  }}
                />
              </Grid>

              {IsEditing ? null : (
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
              )}

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
                {IsEditing ? "Update" : "Register"}
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormUser;
