import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContex";
import FormUser from "../components/FormUser";

const UpdateUser = () => {
  const { state } = useLocation();
  const { error, user, UpdateUser, isAuth, loading } = useUserAuth();
  const IsEditing = state.IsEditing;

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/");
      }
    }
  }, [isAuth, loading]);

  return (
    <Box
      height={"75vh"}
      display={"flex"}
      flexDirection={"column"}
      mt={5}
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
        <h2>Edit Account</h2>
        <FormUser IsEditing={IsEditing} user={user} UpdateUser={UpdateUser} />
      </Box>
    </Box>
  );
};

export default UpdateUser;
