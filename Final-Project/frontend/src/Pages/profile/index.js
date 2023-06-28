import React, { useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  Button,
  Container,
  Box,
  Grid,
  CssBaseline,
  TextField,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert2";
import "../../Css/Body_One.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import "../../Css/Register.css";
import Navbar from "../../Components/Navbar";
import { getUser, getToken } from "../../Services/Authen";

const theme = createTheme();

const Profile = (props) => {

  const [state, setState] = useState({
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

  useEffect(() => {
    {
      !getUser() && (window.location = "./login");
    }
    axios
      .get(`${process.env.REACT_APP_API}/profile/${props.match.params.email}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const {
          fname,
          lname,
          id_card,
          tel,
          address,
          province,
          postal,
          district,
          sub_district,
          email,
        } = response.data;
        setState({
          ...state,
          fname,
          lname,
          id_card,
          tel,
          address,
          province,
          postal,
          district,
          sub_district,
          email,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const inputValue = (name) => (e) => {
    console.log(name, "=", e.target.value);
    setState({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/profile/${props.match.params.email}`,
        {
          fname,
          lname,
          id_card,
          tel,
          address,
          province,
          postal,
          district,
          sub_district,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        swal.fire("แจ้งเตือน", `${response.data.message}`, "success");
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
            <h1 className="h1_login">ข้อมูลผู้ใช้</h1>
            <Box component="form" sx={{ mt: 3 }} onSubmit={submitForm}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label="ชื่อ"
                    className="form-control"
                    value={fname}
                    onChange={inputValue("fname")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="นามสกุล"
                    type="text"
                    value={lname}
                    onChange={inputValue("lname")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เลขประจำตัวประชาชน"
                    type="text"
                    value={id_card}
                    onChange={inputValue("id_card")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เบอร์โทร"
                    type="text"
                    value={tel}
                    onChange={inputValue("tel")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="ที่อยู่"
                    type="text"
                    value={address}
                    onChange={inputValue("address")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="จังหวัด"
                    type="text"
                    value={province}
                    onChange={inputValue("province")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="รหัสไปรษณีย์"
                    type="text"
                    value={postal}
                    onChange={inputValue("postal")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เขต / อำเภอ"
                    type="text"
                    value={district}
                    onChange={inputValue("district")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
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
                sx={{ mt: 2, mb: 4, bgcolor: "#293c6e" }}
              >
                อัปเดตข้อมูล
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
