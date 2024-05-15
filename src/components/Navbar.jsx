import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = ({ where }) => {
  return (
    <Box display={"flex"} justifyContent={"space-between"} p={2}>
      <Box>
        <Link to={"/"} style={{ textDecoration: "none", color: "#fafafa" }}>
          <Typography variant="h4" fontWeight={"Bold"}>
            MeetUp / <Typography variant="overline">{where}</Typography>
          </Typography>
        </Link>
      </Box>
      <Box display={"flex"} alignItems={"center"}>
        <ul style={{ display: "Flex", gap: 20 }}>
          <Link
            to={"/Events"}
            style={{ textDecoration: "none", color: "#fafafa" }}
          >
            Explore
          </Link>
          <Link
            to={"/MyEvents"}
            style={{ textDecoration: "none", color: "#fafafa" }}
          >
            My Events
          </Link>
          <Link
            to={"/profile"}
            style={{ textDecoration: "none", color: "#fafafa" }}
          >
            Profile
          </Link>
        </ul>
      </Box>
    </Box>
  );
};

export default Navbar;
