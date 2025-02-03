import { signOut } from "firebase/auth";
import { auth } from "../firbaseconfigs";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export default function Header({ loggedInUser }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    signOut(auth)
      .then(() => navigate(`/${SIGN_IN}`))
      .catch((e) => console.error(e));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "90px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: 10,
        backgroundColor: "#87ebeb",
      }}
    >
      <Typography sx={{ fontSize: "40px", paddingLeft: "10px" }}>
        Firebase Testing
      </Typography>
      {loggedInUser ? (
        <Box sx={{ display: "flex", gap: "10px", paddingRight: "10px" }}>
          <Typography>{loggedInUser.email}</Typography>
          <Button
            variant="outlined"
            onClick={onLogoutClick}
            color="black"
            children="Log Out"
          />
        </Box>
      ) : (
        <Typography>No User</Typography>
      )}
    </Box>
  );
}
