import React, { useState } from "react";
import "../../Css/Body_One.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import "../../Css/Subject.css";
import "../../Css/Info.css";
import {
    Button,
    Box,
    Grid,
    TextField,
  } from "@mui/material";
import Navbar from "../../Components/Navbar";
import swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getUser, getToken } from "../../Services/Authen";

const Form = () => {

  const {id} = useParams();
  const [status, setStatus]= useState ({
    status:"พร้อมกรอกและส่งเอกสาร"
  }) 

  const [form1, setform1] = useState({
    c_id: id,
    f_check: "",
    f1_check: "",
    f1_type: "",
    f1_name: "",
    f1_address: "",
    f1_province: "",
    f1_postal: "",
    f1_district: "",
    f1_sub_district: "",
    f1_tel: "",
    f1_email: "",
    f1_idcard: "",
    f2_check: "",
    f2_type: "",
    f2_name: "",
    f2_address: "",
    f2_province: "",
    f2_postal: "",
    f2_district: "",
    f2_sub_district: "",
    f2_email: "",
    f2_idcard: "",
    f3_check: "",
    f3_name: "",
    f3_address: "",
    f3_province: "",
    f3_postal: "",
    f3_district: "",
    f3_sub_district: "",
    f3_email: "",
    f3_tel: "",
    f3_idcard: "",
    f3_id: "",
  });

  const onHandleValue = () => {
    axios.post(`${process.env.REACT_APP_API}/form/${id}`, {data:form1})
      .then((response) => {
        setStatus({status:"พร้อมกรอกและส่งเอกสาร"})
           axios.put(`${process.env.REACT_APP_API}/cardinfo/${id}`, {data:status})
        swal
          .fire("แจ้งเตือน", `เสร็จสิ้น`, "success")
          .then((response) => {
            window.location = `/cardinfo/${id}`;
          });
      })
      .catch((err) => {
        swal.fire("แจ้งเตือน", `${err.response.data.error}`, "warning");
      });
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className="container-xl px-4 mt-5 mtf ">
            <div className="card mb-4">
              <div className="card-body ">

                <form className="form-check-label" >
                <div className="mb-5"><strong ><h4><u>ผู้ขอรับสิทธิบัตร / อนุสิทธิบัตร อยู่ในสถานะใด ?</u></h4></strong></div>
                  <div className="form-check form-check-inline">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value={"บุคคลธรรมดา"}
                      onChange={(e) => setform1({...form1, f1_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio1">
                    <h5>
                    บุคคลธรรมดา
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                    required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value={"นิติบุคคล"}
                      onChange={(e) => setform1({...form1, f1_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio2">
                    <h5>
                    นิติบุคคล
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                    required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio3"
                      value={"หน่วยงานรัฐ"}
                      onChange={(e) => setform1({...form1, f1_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio3">
                    <h5>
                    หน่วยงานรัฐ
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                    required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio4"
                      value={"มูลนิธิ"}
                      onChange={(e) => setform1({...form1, f1_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio4">
                    <h5>
                    มูลนิธิ
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                    required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio5"
                      value={"อื่นๆ"}
                      onChange={(e) => setform1({...form1, f1_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio5">
                    <h5>
                    อื่น ๆ
                    </h5>
                    </label>
                  </div>




                  
                <form className="form-check-label">
                {form1.f1_type !== "บุคคลธรรมดา" ? ( 
                  <div>  
                 <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            
            <Box component="form" >
            <div className="mb-5"><strong ><h4><u>ข้อมูลผู้ขอรับสิทธิบัตร / อนุสิทธิบัตร</u></h4></strong></div>
              <Grid container spacing={3} >
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label="ชื่อ"
                    className="form-control"
                    value={form1.f1_name}
                    onChange={(e) => setform1({...form1, f1_name:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label="อีเมล"
                    className="form-control"
                    value={form1.f1_email}
                    onChange={(e) => setform1({...form1, f1_email:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เลขประจำตัวประชาชน / เลขทะเบียนนิติบุคคล / เลขประจำตัวผู้เสียภาษีอากร "
                    type="text"
                    value={form1.f1_idcard}
                    onChange={(e) => setform1({...form1, f1_idcard:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เบอร์โทร"
                    type="text"
                    value={form1.f1_tel}
                    onChange={(e) => setform1({...form1, f1_tel:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="ที่อยู่"
                    type="text"
                    value={form1.f1_address}
                    onChange={(e) => setform1({...form1, f1_address:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="จังหวัด"
                    type="text"
                    value={form1.f1_province}
                    onChange={(e) => setform1({...form1, f1_province:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="รหัสไปรษณีย์"
                    type="text"
                    value={form1.f1_postal}
                    onChange={(e) => setform1({...form1, f1_postal:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เขต / อำเภอ"
                    type="text"
                    value={form1.f1_district}
                    onChange={(e) => setform1({...form1, f1_district:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="แขวง / ตำบล"
                    type="text"
                    value={form1.f1_sub_district}
                    onChange={(e) => setform1({...form1, f1_sub_district:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Box>
          </Box>
          </div>
                  ):(<div></div>)}
          </form>




          <div className="mb-5 mt-5"><strong ><h4><u>ผู้ขอรับสิทธิบัตร / อนุสิทธิบัตร เป็นบุคคลใดดังต่อไปนี้ ?</u></h4></strong></div>
          <form className="form-check-label">
          <div className="form-check form-check-inline ">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio8"
                      value={"เป็นผู้ประดิษฐ์ / ผู้ออกแบบ"}
                      onChange={(e) => setform1({...form1, f2_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio8">
                    <h5>
                    เป็นผู้ประดิษฐ์ / ผู้ออกแบบ
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio9"
                      value={"เป็นผู้รับโอนผลงานมาจากผู้อื่น"}
                      onChange={(e) => setform1({...form1, f2_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio9">
                    <h5>
                    เป็นผู้รับโอนผลงานมาจากผู้อื่น
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio10"
                      value={"เป็นผู้ขอรับสิทธิโดยเหตุอื่น"}
                      onChange={(e) => setform1({...form1, f2_type:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio10">
                    <h5>
                    เป็นผู้ขอรับสิทธิโดยเหตุอื่น
                    </h5>
                    </label>
                  </div>
          </form>

          {form1.f1_type !== "บุคคลธรรมดา" || form1.f2_type !== "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ" ? (
          <form className="form-check-label">
          <div className="mb-5 mt-5 d-flex"><strong ><h4><u>ข้อมูลของผู้ประดิษฐ์ / ผู้ออกแบบผลิตภัณฑ์</u></h4></strong><div style={{ color: "#F94343", fontSize: 20 }}>
            <a className="card-text type mt-1">&nbsp; &nbsp;(ต้องเป็น "บุคคลธรรมดา" เท่านั้น)</a>
          </div></div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio20"
              value={"true"}
              onChange={(e) => setform1({...form1, f2_check:e.target.value})}
            />
            <label className="form-check-label" for="inlineRadio20">
            <h5>
            ข้อมูลเดียวกับของผู้ใช้งาน
            </h5>
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio21"
              value={"false"}
              onChange={(e) => setform1({...form1, f2_check:e.target.value})}
            />
            <label className="form-check-label" for="inlineRadio21">
            <h5>
            กรอกใหม่
            </h5>
            </label>
          </div>

          {form1.f2_check === "false" ? ( 
             <Box
             sx={{
               marginTop: 2,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
             }}
           >
             <Box component="form" >
               <Grid container spacing={3}>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     type="text"
                     label="ชื่อ"
                     className="form-control"
                     value={form1.f2_name}
                     onChange={(e) => setform1({...form1, f2_name:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     type="text"
                     label="อีเมล"
                     className="form-control"
                     value={form1.f2_email}
                     onChange={(e) => setform1({...form1, f2_email:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     className="form-control"
                     label="เลขประจำตัวประชาชน"
                     type="text"
                     value={form1.f2_idcard}
                     onChange={(e) => setform1({...form1, f2_idcard:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12}>
                   <TextField
                     required
                     fullWidth
                     className="form-control"
                     label="ที่อยู่"
                     type="text"
                     value={form1.f2_address}
                     onChange={(e) => setform1({...form1, f2_address:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     className="form-control"
                     label="จังหวัด"
                     type="text"
                     value={form1.f2_province}
                     onChange={(e) => setform1({...form1, f2_province:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     className="form-control"
                     label="รหัสไปรษณีย์"
                     type="text"
                     value={form1.f2_postal}
                     onChange={(e) => setform1({...form1, f2_postal:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     className="form-control"
                     label="เขต / อำเภอ"
                     type="text"
                     value={form1.f2_district}
                     onChange={(e) => setform1({...form1, f2_district:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12} sm={6}>
                   <TextField
                     required
                     fullWidth
                     className="form-control"
                     label="แขวง / ตำบล"
                     type="text"
                     value={form1.f2_sub_district}
                     onChange={(e) => setform1({...form1, f2_sub_district:e.target.value})}
                   />
                 </Grid>
                 <Grid item xs={12}></Grid>
               </Grid>
             </Box>
           </Box>
          ):(<div></div>)}
  </form>
  ):(<div></div>)}

          






          <div className="mb-5 mt-5 d-flex"><strong ><h4><u>มีตัวแทนในการขอรับสิทธิบัตร / อนุสิทธิบัตรหรือไม่ ?</u></h4></strong><div style={{ color: "#F94343", fontSize: 20 }}>
            <a className="card-text type mt-1">&nbsp; &nbsp;(ต้องเป็นตัวแทนที่ได้ขึ้นทะเบียนไว้กับ "กรมทรัพย์สินทางปัญญา" เท่านั้น)</a>
        </div></div>
          <form className="form-check-label">
          <div className="form-check form-check-inline mb-5">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio12"
                      value={"true"}
                      onChange={(e) => setform1({...form1, f3_check:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio12">
                    <h5>
                    มี
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio13"
                      value={"false"}
                      onChange={(e) => setform1({...form1, f3_check:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio13">
                    <h5>
                    ไม่มี
                    </h5>
                    </label>
                  </div>
          </form>




          {form1.f3_check === "true" ? (
          <form className="form-check-label">
                  <div className="mb-5"><strong ><h4><u>ข้อมูลของตัวแทน</u></h4></strong></div>

                  <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" >
              <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="ตัวแทนเลขที่"
                    type="text"
                    value={form1.f3_id}
                    onChange={(e) => setform1({...form1, f3_id:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label="ชื่อ"
                    className="form-control"
                    value={form1.f3_name}
                    onChange={(e) => setform1({...form1, f3_name:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    label="อีเมล"
                    className="form-control"
                    value={form1.f3_email}
                    onChange={(e) => setform1({...form1, f3_email:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เลขประจำตัวประชาชน"
                    type="text"
                    value={form1.f3_idcard}
                    onChange={(e) => setform1({...form1, f3_idcard:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เบอร์โทร"
                    type="text"
                    value={form1.f3_tel}
                    onChange={(e) => setform1({...form1, f3_tel:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="ที่อยู่"
                    type="text"
                    value={form1.f3_address}
                    onChange={(e) => setform1({...form1, f3_address:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="จังหวัด"
                    type="text"
                    value={form1.f3_province}
                    onChange={(e) => setform1({...form1, f3_province:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="รหัสไปรษณีย์"
                    type="text"
                    value={form1.f3_postal}
                    onChange={(e) => setform1({...form1, f3_postal:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="เขต / อำเภอ"
                    type="text"
                    value={form1.f3_district}
                    onChange={(e) => setform1({...form1, f3_district:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    className="form-control"
                    label="แขวง / ตำบล"
                    type="text"
                    value={form1.f3_sub_district}
                    onChange={(e) => setform1({...form1, f3_sub_district:e.target.value})}
                  />
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
            </Box>
          </Box>
          </form>
          ):(<div></div>)}

<form>
<div className="mb-5"><strong ><h4><u>ผลงานชิ้นนี้มี "ผู้ขอรับ/ตัวแทน/ผู้ประดิษฐ์/ผู้ออกแบบผลิตภัณฑ์" มากกว่า 1 คนหรือไม่ ?</u></h4></strong></div>
                  <div className="form-check form-check-inline mb-5">
                    <input
                      required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio30"
                      value={"true"}
                      onChange={(e) => setform1({...form1, f_check:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio30">
                    <h5>
                    ใช่
                    </h5>
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                    required
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio31"
                      value={"false"}
                      onChange={(e) => setform1({...form1, f_check:e.target.value})}
                    />
                    <label className="form-check-label" for="inlineRadio31">
                    <h5>
                    ไม่ใช่
                    </h5>
                    </label>
                  </div>
                  </form>
                  


          <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: "#293c6e" }}
                onClick={() => onHandleValue()}
              >
                บันทึก
              </Button>


                </form>
              </div>
            </div>
        </div>
    </React.Fragment>
  );
};

export default Form;
