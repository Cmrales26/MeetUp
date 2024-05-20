import React, { useEffect } from "react";
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

const FormBusiness = ({ CreateBusiness, IsEditing, user, updateBusiness }) => {
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
          bio: yup
            .string()
            .required("Bio is required")
            .min(20, "Bio must be at least 20 characters")
            .max(250, "Bio must be at most 250 characters")
            .trim(),
          fundationdate: yup
            .date()
            .default(() => new Date())
            .required("Foundation date is required"),
        })
      : yup.object({
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
            .required("Foundation date is required"),
          password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
            .trim(),
        });

  const handleSubmit = async (values) => {
    if (!IsEditing) {
      let res = await CreateBusiness(values);
      if (res.status === 201) {
        alert("Business successfully created");
        navigate("/login");
      }
    } else {
      let res = await updateBusiness(values, user.BusinessID);
      if (res.status === 200) {
        alert("Business updated");
        window.location.href = "/home/business";
      }
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const initialValues =
    IsEditing && user
      ? { name: user.Name, bio: user.Bio, fundationdate: user.FundationDate }
      : { name: "", bio: "", fundationdate: "", password: "" };

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
                  disabled={IsEditing ? true : false}
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
                  value={values.fundationdate}
                  name="fundationdate"
                  error={touched.fundationdate && Boolean(errors.fundationdate)}
                  helperText={touched.fundationdate && errors.fundationdate}
                  sx={{
                    marginBottom: 2,
                    "& .MuiFormLabel-root": { color: "white" },
                    "& .MuiInputBase-input": { color: "white" },
                  }}
                  InputLabelProps={{ shrink: true }}
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
                {IsEditing ? null : (
                  <Typography variant="caption">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      style={{ textDecoration: "none", color: "#1565c0" }}
                    >
                      Login
                    </Link>
                  </Typography>
                )}
              </Box>
              <Button variant="contained" type="submit" fullWidth>
                {IsEditing ? "Update Business" : "Register Business"}
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormBusiness;
