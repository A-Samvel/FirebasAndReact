import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firbaseconfigs";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { DASBOARD, SIGN_IN } from "../consts";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignUpClick = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate(`/${DASBOARD}`);
      })
      .catch((e) => {
        console.log(e);
      });

    setEmail("");
    setPassword("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchValue.trim()) onSignUpClick();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "black 2px solid",
          flexDirection: "column",
          width: "60%",
          height: "55%",
          borderRadius: "20px",
          backgroundColor: "#87ebeb",
          boxShadow: 10,
          gap: "30px",
        }}
      >
        <Typography sx={{ fontSize: "40px" }}>Sign Up</Typography>

        <TextField
          required
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <TextField
          required
          variant="standard"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={onSignUpClick}
          onKeyDown={(e) => handleKeyDown(e)}
          size="large"
          color="black"
          children="Sign Up"
        />
        <Typography>
          Already have an account? <Link to={`/${SIGN_IN}`}>Sign In</Link>
        </Typography>
      </Box>
    </Box>
  );
}
