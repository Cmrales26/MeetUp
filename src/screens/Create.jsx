import { Box, Typography } from "@mui/material";
import { useState } from "react";
import FormUser from "../components/FormUser";
import { useUserAuth } from "../context/AuthContex";
import FormBusiness from "../components/FormBusiness";

const Create = () => {
  const [whoCreate, setWhoCreate] = useState("User");
  const { Create, error, CreateBusiness } = useUserAuth();
  return (
    <Box
      // height={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      mt={5}
      mb={5}
      alignItems={"center"}
    >
      <Box p={4} bgcolor={"#1c172e"} borderRadius={1} width={800}>
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
        <h2>Create Account</h2>
        <Box gap={1} display={"flex"} mb={2}>
          <Typography
            variant="overline"
            style={{
              color: whoCreate === "User" ? "#1565c0" : "#fafafa",
              cursor: "pointer",
            }}
            onClick={() => setWhoCreate("User")}
          >
            User
          </Typography>

          <Typography
            variant="overline"
            style={{
              color: whoCreate === "Business" ? "#1565c0" : "#fafafa",
              cursor: "pointer",
            }}
            onClick={() => setWhoCreate("Business")}
          >
            Business
          </Typography>
        </Box>
        {whoCreate === "User" ? (
          <FormUser Create={Create} />
        ) : (
          <FormBusiness CreateBusiness={CreateBusiness} />
        )}
      </Box>
    </Box>
  );
};

export default Create;
