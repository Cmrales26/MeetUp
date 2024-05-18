import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const BusinessBanner = ({ business }) => {
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
  return (
    <Box
      className="ProfileHeader"
      px={4}
      py={6}
      sx={{ backgroundColor: "#1c172e" }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Typography variant="h4" fontWeight={"Bold"} color={"#f5b400"}>
          {business.Name}
        </Typography>

        {business.rol === undefined ? null : (
          <Link to={"/Config"} style={{ color: "#fafafa" }}>
            <ManageAccountsIcon
              sx={{ ml: 1, fontSize: 35, mt: 0.5 }}
              titleAccess="Account Configuration"
            />
          </Link>
        )}
      </Box>

      <Box display={"flex"} gap={3} mt={1}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant="body2">
            Founded {CalculateAge(business.FundationDate)} years ago
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessBanner;
