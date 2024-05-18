import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";

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
          <Box alignItems={"center"} display={"flex"} gap={1}>
            <Link
              to={"/Events"}
              style={{ textDecoration: "none", color: "#fafafa" }}
            >
              Explore
            </Link>
            <ExploreIcon />
          </Box>

          <Box alignItems={"center"} display={"flex"} gap={1}>
            <Link
              to={"/MyEvents"}
              style={{ textDecoration: "none", color: "#fafafa" }}
            >
              My Events
            </Link>
            <DateRangeIcon />
          </Box>
          <Box alignItems={"center"} display={"flex"} gap={1}>
            <Link
              to={"/profile"}
              style={{ textDecoration: "none", color: "#fafafa" }}
            >
              Profile
            </Link>
            <PersonIcon />
          </Box>
        </ul>
      </Box>
    </Box>
  );
};

export default Navbar;
