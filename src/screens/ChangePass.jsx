import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChangePassForm from "../components/ChangePassForm";
import { useUserAuth } from "../context/AuthContex";

const ChangePass = () => {
  const { ChangeUserPass, ChangeBusinessPass, user, isAuth, loading, error } =
    useUserAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/home");
      }
    }
  }, [user, isAuth, loading]);
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Box p={4} bgcolor={"#1c172e"} borderRadius={1} width={700}>
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
        <h2>Change Password</h2>
        <ChangePassForm
          ChangeUserPass={ChangeUserPass}
          ChangeBusinessPass={ChangeBusinessPass}
          user={user}
        />
      </Box>
    </Box>
  );
};

export default ChangePass;
