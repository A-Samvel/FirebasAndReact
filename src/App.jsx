import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, doc } from "./firbaseconfigs";
import DataBase from "./components/Database";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Header from "./components/Header";
import { DASBOARD, SIGN_IN, SIGN_UP } from "./consts";
import { Box, CircularProgress } from "@mui/material";
import NotYet from "./components/NotYet";
import { getDoc } from "firebase/firestore";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        getDoc(docRef)
          .then((s) => {
            setLoggedInUser(s.data());
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoggedInUser(null);
        setLoading(false)
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <BrowserRouter>
      {/* <Routes>
        <Route
          path="/"
          element={
            loggedInUser ? (
              <Navigate to={`/${DASBOARD}`} />
            ) : (
              <Navigate to={`/${SIGN_IN}`} />
            )
          }
        />
        <Route
          path={`/${SIGN_IN}`}
          element={
            !loggedInUser ? <SignIn /> : <Navigate to={`/${DASBOARD}`} />
          }
        />
        <Route
          path={`/${SIGN_UP}`}
          element={
            !loggedInUser ? <SignUp /> : <Navigate to={`/${DASBOARD}`} />
          }
        />
        <Route
          path={`/${DASBOARD}`}
          element={
            loggedInUser ? (
              <>
                <Header loggedInUser={loggedInUser} />
                <DataBase />
              </>
            ) : (
              <Navigate to={`/${SIGN_IN}`} />
            )
          }
        />
      </Routes> */}
      {loggedInUser ? (
        <Routes>
          <Route
            path={`/${SIGN_IN}`}
            element={<Navigate to={`/${DASBOARD}`} />}
          />
          <Route
            path={`/${SIGN_UP}`}
            element={<Navigate to={`/${DASBOARD}`} />}
          />
          <Route path="/" element={<Navigate to={`/${DASBOARD}`} />} />
          <Route
            path={`/${DASBOARD}`}
            element={
              <>
                <Header loggedInUser={loggedInUser} />
                <DataBase />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header loggedInUser={loggedInUser} />
                <NotYet />
              </>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path={`/${SIGN_IN}`} element={<SignIn />} />
          <Route path={`/${SIGN_UP}`} element={<SignUp />} />
          <Route path="*" element={<Navigate to={`/${SIGN_IN}`} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
