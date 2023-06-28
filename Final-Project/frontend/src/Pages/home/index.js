import * as React from "react";
import { useEffect } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import "../../Css/Body_Two.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import image from "../../Images/BG_Pic.png";
import Navbar from "../../Components/Navbar";
import { getUser } from "../../Services/Authen";

const theme = createTheme();

function Home() {

  useEffect(() => {
    {
      getUser() && (window.location = `./profile/${getUser()}`);
    }
  }, [])
    
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="split left">
              <div className="d-flex justify-content-center flex-column min-vh-100 align-items-center banner">
                <div className="col-md-9 text">
                  <h1>ระบบตรวจสอบทรัพย์สินทางปัญญาและตัวช่วยในการจดทะเบียน</h1>
                  <p className="text">
                    เว็บไซต์ที่ช่วยในการตรวจสอบประเภทผลงานของผู้ใช้
                    ตรวจสอบคุณสมบัติในการจดทะเบียนของผลงานและตัวช่วยในการจดทะเบียนและบันทึกข้อมูลของผลงานผู้ใช้ไว้ในระบบ
                  </p>
                  <form action="/login">
                    <button className="cbutton">
                      <span>เริ่มต้นใช้งาน</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
};

export default Home;
