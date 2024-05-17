import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Err404 = () => {
  const [error, setErrorMessage] = useState(
    "Sorry, the page you are looking for is not available. You can go back to the home page."
  );
  const [redirect, setRedirect] = useState("/");
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      if (state.ErrorId === 2) {
        setErrorMessage(
          "Sorry, the Event you are looking for is not available. You can Check all our event, Clicking"
        );
        setRedirect(state.redirect);
      }
    }
  });
  return (
    <Box
      height={"70vh"}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      mt={5}
      flexDirection={"column"}
    >
      <Typography variant="h2" mb={2}>
        Error 404
      </Typography>
      <Typography>{error}</Typography>
      <Link style={{ color: "#1565c0", textDecoration: "none" }} to={redirect}>
        {redirect.split("/")[1] || "Home"}
      </Link>
    </Box>
  );
};

export default Err404;
