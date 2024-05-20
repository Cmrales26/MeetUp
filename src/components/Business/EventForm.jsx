import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Grid, TextField } from "@mui/material";

const EventForm = ({
  IsEditing,
  CreateEventController,
  editEvent,
  EditEventController,
}) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  useEffect(() => {
    if (IsEditing && editEvent) {
      setInitialValues({
        name: editEvent.name,
        description: editEvent.description,
        date: editEvent.date,
        time: editEvent.time,
        location: editEvent.location,
      });
    } else {
      setInitialValues({
        name: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
    }
  }, [IsEditing, editEvent]);

  const validationSchema = yup.object({
    name: yup.string().required().max(50),
    description: yup.string().required().min(20).max(250),
    date: yup
      .date()
      .default(() => new Date())
      .required(),
    time: yup
      .string()
      .length(5)
      .matches(/(\d){2}:(\d){2}/, 'Hour must have this pattern "00:00"'),

    location: yup.string().required(),
  });

  const handelSubmit = async (values) => {
    if (!IsEditing) {
      let res = await CreateEventController(values);
      if (res.status !== undefined && res.status === 201) {
        window.location.reload();
      }
    } else {
      let res = await EditEventController(editEvent.id, values);
      if (res.status !== undefined && res.status === 200) {
        window.location.reload();
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handelSubmit}
      enableReinitialize
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
                label="Event Name"
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
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                type="text"
                multiline={true}
                rows={4}
                label="Event Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                sx={{
                  marginBottom: 2,
                  "& .MuiFormLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                }}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="filled"
                fullWidth
                type="date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={touched.date && Boolean(errors.date)}
                helperText={touched.date && errors.date}
                sx={{
                  marginBottom: 2,
                  "& .MuiFormLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                variant="filled"
                fullWidth
                type="time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time}
                name="time"
                error={touched.time && Boolean(errors.time)}
                helperText={touched.time && errors.time}
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
                type="text"
                label="Event Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={touched.location && Boolean(errors.location)}
                helperText={touched.location && errors.location}
                sx={{
                  marginBottom: 2,
                  "& .MuiFormLabel-root": { color: "white" },
                  "& .MuiInputBase-input": { color: "white" },
                }}
                required
              />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" fullWidth>
            {IsEditing ? "Update" : "Create Event"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default EventForm;
