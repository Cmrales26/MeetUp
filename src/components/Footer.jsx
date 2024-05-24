import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1c172e" }}>
      <Typography padding={3} textAlign={"center"}>
        Developed por{" "}
        <a
          style={{ color: "#fafafa" }}
          href="https://github.com/Cmrales26"
          target="_blank"
        >
          Nelson Morales
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;
