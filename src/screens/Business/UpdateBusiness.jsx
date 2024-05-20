import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/AuthContex";
import FormBusiness from "../../components/FormBusiness";

const UpdateBusiness = () => {
  const { state } = useLocation();
  const { error, user, updateBusiness, isAuth, loading } = useUserAuth();
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
        <FormBusiness
          IsEditing={IsEditing}
          user={user}
          updateBusiness={updateBusiness}
        />
      </Box>
    </Box>
  );
};

export default UpdateBusiness;
