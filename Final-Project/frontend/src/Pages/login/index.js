import React, { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Container,
  Link,
  Box,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { withRouter } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import "../../Css/Body_One.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import "../../Css/Login.css";
import Navbar from "../../Components/Navbar";
import { Authen, getToken, getUser } from "../../Services/Authen";

const theme = createTheme();

const Login = (props) => {

  useEffect(() => {
    {
      getUser() && (window.location = `./profile/${getUser()}`);
    }
  }, [])

  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const { email, password } = state;

  const inputValue = (name) => (e) => {
    console.log(name, "=", e.target.value);
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("API URL = ", process.env.REACT_APP_API);
    axios
      .post(
        `${process.env.REACT_APP_API}/login`,
        { email, password },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        Authen(response, () => props.history.push(`./profile/${email}`));
        console.log(response);
        swal
          .fire("แจ้งเตือน", "เข้าสู่ระบบสำเร็จ", "success")
          .then((response) => {
            window.location = `./${email}`;
          });
      })
      .catch((err) => {
        swal.fire("แจ้งเตือน", `${err.response.data.error}`, "error");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="card container">
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#293c6e" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h1 className="h1_login">เข้าสุ่ระบบ</h1>
            <Box
              component="form"
              onSubmit={submitForm}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={inputValue("email")}
                value={email}
                id="email"
                label="อีเมล"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={inputValue("password")}
                value={password}
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#293c6e" }}
              >
                ล็อกอิน
              </Button>
              <Grid container className="pb-5">
                <Grid item>
                  <Link href="/register" className="link">
                    ยังไม่มีบัญชีผู้ใช้? ลงทะเบียน
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default withRouter(Login);
