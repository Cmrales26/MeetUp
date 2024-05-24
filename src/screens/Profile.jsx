import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContex";
import Navbar from "../components/Navbar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useUserEvents } from "../context/UserEventContext";
import CakeIcon from "@mui/icons-material/Cake";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MyEvents from "../components/MyEvents";

const Profile = () => {
  const navigate = useNavigate();
  const { isAuth, user, loading, LogOutController } = useUserAuth();
  const { myEvents, getMyEventsController } = useUserEvents();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/");
      }
    }

    if (user.rol !== undefined && user.rol == "business") {
      navigate("/profile/business");
    }
  }, [isAuth, loading, user]);

  useEffect(() => {
    getMyEventsController();
  }, []);

  const logOut = () => {
    LogOutController();
  };
  const CalculateAge = (BirthDate) => {
    var today = new Date();
    var birthDate = new Date(BirthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box height={"100vh"}>
      <Navbar where={"Profile"} />
      <Box
        className="ProfileHeader"
        px={4}
        py={6}
        sx={{ backgroundColor: "#1c172e" }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="h4" fontWeight={"Bold"}>
            {user.Name} {user.LastName}{" "}
          </Typography>

          <Link to={"/Config"} style={{ color: "#fafafa" }}>
            <ManageAccountsIcon
              sx={{ ml: 1, fontSize: 35, mt: 0.5 }}
              titleAccess="Account Configuration"
            />
          </Link>
        </Box>

        <Box display={"flex"} gap={3} mt={2}>
          <Box display={"flex"} alignItems={"center"}>
            <CakeIcon sx={{ mr: 1 }} />
            <Typography variant="body2">
              {CalculateAge(user.BirthDate)} years old
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"center"}>
            <AttachEmailIcon sx={{ mr: 1 }} />
            <Typography variant="body2">{user.Email}</Typography>
          </Box>
        </Box>
      </Box>

      <Box p={4}>
        <Typography variant="h5" fontWeight={"bold"}>
          About me
        </Typography>
        <Typography variant="body1">{user.Bio}</Typography>

        <Box>
          <Typography variant="h5" fontWeight={"bold"} mt={4}>
            My Events
          </Typography>
          <Box className="Events" mt={2}>
            <MyEvents myEvents={myEvents}></MyEvents>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
