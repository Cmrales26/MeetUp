import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContex";
import EditIcon from "@mui/icons-material/Edit";
import PasswordIcon from "@mui/icons-material/Password";
import ChecklistIcon from "@mui/icons-material/Checklist";
import LogoutIcon from "@mui/icons-material/Logout";

const Configuration = () => {
  const { isAuth, loading, LogOutController, user } = useUserAuth();
  const [isBusiness, setIsBusiness] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/");
      }
    }
    if (user.rol !== undefined && user.rol === "business") {
      setIsBusiness(true);
    } else {
      setIsBusiness(false);
    }
  }, [isAuth, loading]);

  const logOut = () => {
    LogOutController();
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      height={"100vh"}
    >
      <Box p={4} bgcolor={"#1c172e"} borderRadius={1} width={800}>
        <h2>Configuration</h2>

        <Button
          sx={{ textAlign: "left", width: "100%" }}
          onClick={() => {
            if (isBusiness) {
              navigate("/profile/edit/business", {
                state: { IsEditing: true },
              });
            } else {
              navigate("/profile/edit", { state: { IsEditing: true } });
            }
          }}
        >
          <Box bgcolor={"#231e36"} p={2} mt={2} borderRadius={1} width={"100%"}>
            <Box display={"flex"}>
              <EditIcon sx={{ mr: 1, color: "#f5b400" }} />
              <Typography variant="button" color={"#f5b400"}>
                Edit {isBusiness ? "business" : "user"} Info
              </Typography>
            </Box>
            <Typography variant="body2" color="#fafafa" ml={4} sx={{ mt: 1 }}>
              Update your personal information by editing your profile details
              here.
            </Typography>
          </Box>
        </Button>

        <Button
          fullWidth
          sx={{ textAlign: "left" }}
          onClick={() => {
            navigate("/ChangePass");
          }}
        >
          <Box bgcolor={"#231e36"} p={2} mt={2} borderRadius={1} width={"100%"}>
            <Box display={"flex"}>
              <PasswordIcon sx={{ mr: 1, color: "#f5b400" }} />
              <Typography variant="button" color={"#f5b400"}>
                Change Password
              </Typography>
            </Box>
            <Typography variant="body2" color="#fafafa" ml={4} sx={{ mt: 1 }}>
              Update your Password
            </Typography>
          </Box>
        </Button>

        {/* <Button
          fullWidth
          sx={{ textAlign: "left" }}
          onClick={() => {
            console.log("HOLA");
          }}
        >
          <Box bgcolor={"#231e36"} p={2} mt={2} borderRadius={1} width={"100%"}>
            <Link
              style={{
                color: "#f5b400",
                textDecoration: "none",
              }}
            >
              <Box display={"flex"}>
                <ChecklistIcon sx={{ mr: 1 }} />
                <Typography variant="button">Change my Topics</Typography>
              </Box>
              <Typography variant="body2" color="#fafafa" ml={4} sx={{ mt: 1 }}>
                Customize your profile by selecting topics that interest you the
                most.
              </Typography>
            </Link>
          </Box>
        </Button> */}

        <hr style={{ marginTop: "1rem" }} />
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            logOut();
          }}
        >
          <LogoutIcon style={{ color: "red" }} sx={{ mr: 1 }} />
          <Typography variant="button" color={"red"}>
            Log Out
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Configuration;
