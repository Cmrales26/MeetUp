import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ user, isAuth }) => {
  console.log(user)
  return (
    <Box display={"flex"} justifyContent={"space-between"} p={2}>
      <Box>
        <h1>MeetUp</h1>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <ul style={{ display: "Flex", gap: 20 }}>
          <Link style={{ textDecoration: "none", color: "#fafafa" }}>Explore</Link>
          <Link style={{ textDecoration: "none", color: "#fafafa" }}>My Events</Link>
          <Link style={{ textDecoration: "none", color: "#fafafa" }}>Profile</Link>
        </ul>
      </Box>
    </Box>
  );
};

export default Navbar;