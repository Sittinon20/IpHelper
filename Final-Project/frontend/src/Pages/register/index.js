import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert2";
import "../../Css/Body_One.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import "../../Css/Register.css";
import Navbar from "../../Components/Navbar";
import { getUser } from "../../Services/Authen";

const theme = createTheme();

const Register = () => {

  useEffect(() => {
    {
      getUser() && (window.location = `./profile/${getUser()}`);
    }
  }, [])

  const [state, setState] = useState({
    email: "",
    password: "",
    cpassword: "",
    fname: "",
    lname: "",
    id_card: "",
    tel: "",
    address: "",
    province: "",
    postal: "",
    district: "",
    sub_district: "",
  });
  const {
    email,
    password,
    cpassword,
    fname,
    lname,
    id_card,
    tel,
    address,
    province,
    postal,
    district,
    sub_district,
  } = state;

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/register`, {
        email,
        password,
        cpassword,
        fname,
        lname,
        id_card,
        tel,
        address,
        province,
        postal,
        district,
        sub_district,
      })
      .then((response) => {
        swal
          .fire("แจ้งเตือน", `${response.data.message}`, "success")
          .then((response) => {
            window.location = "./login";
          });
      })
      .catch((err) => {
        swal.fire("แจ้งเตือน", `${err.response.data.error}`, "warning");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="card container">
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="h1_login">สมัครบัญชีผู้ใช้</h1>
            <Box component="form" sx={{ mt: 3 }} onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    id="email"
                    label="อีเมล"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={inputValue("email")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="รหัสผ่าน"
                    type="password"
                    value={password}
                    onChange={inputValue("password")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    value={cpassword}
                    onChange={inputValue("cpassword")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="ชื่อ"
                    type="text"
                    value={fname}
                    onChange={inputValue("fname")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="นามสกุล"
                    type="text"
                    value={lname}
                    onChange={inputValue("lname")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="เลขประจำตัวประชาชน"
                    type="text"
                    value={id_card}
                    onChange={inputValue("id_card")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="เบอร์โทร"
                    type="text"
                    value={tel}
                    onChange={inputValue("tel")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="ที่อยู่"
                    type="text"
                    value={address}
                    onChange={inputValue("address")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="จังหวัด"
                    type="text"
                    value={province}
                    onChange={inputValue("province")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="รหัสไปรษณีย์"
                    type="text"
                    value={postal}
                    onChange={inputValue("postal")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="เขต / อำเภอ"
                    type="text"
                    value={district}
                    onChange={inputValue("district")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className="form-control"
                    required
                    fullWidth
                    label="แขวง / ตำบล"
                    type="text"
                    value={sub_district}
                    onChange={inputValue("sub_district")}
                  />
                </Grid>

                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#293c6e" }}
              >
                ลงทะเบียน
              </Button>
              <Grid container className="pb-5">
                <Grid item>
                  <Link href="/login" className="link">
                    มีบัญชีผู้ใช้แล้ว? เข้าสู่ระบบ
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

export default Register;
