import React, { useEffect, useState } from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import Navbar from "../../Components/Navbar";
import swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getUser, getToken } from "../../Services/Authen";

const FormInfo = () => {
  const { id } = useParams();
  const [form, setForm] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cardinfo/${id}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        alert(err);
      });

    axios
      .get(`${process.env.REACT_APP_API}/form/${id}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setForm(response.data);
      })
      .catch((err) => {
        alert(err);
      });

    axios
      .get(`${process.env.REACT_APP_API}/profile/${getUser()}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [id]);

  const displayType = (type) => {
    if (type === "สิทธิบัตร") {
      return (<div style={{color: "#439EF9", fontSize: 20}}>การประดิษฐ์</div>)
    } else if (type === "สิทธิบัตรการออกแบบผลิตภัณฑ์") {
      return (<div style={{color: "#439EF9", fontSize: 20}}>การออกแบบผลิตภัณฑ์</div>)
    } else {
      return (<div style={{color: "#439EF9", fontSize: 20}}>{(type)}</div>)
    }
  }

  return (
    <React.Fragment>
      <Navbar/>
      <div className="container-xl mt-5 mtf ">
        

<div class="accordion">



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      <h4>ประเภทของผลงาน</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body">
        <div className="d-flex" style={{fontSize: 20}}>
          {displayType(data.c_type)}
        </div>
      </div>
    </div>
  </div>



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
      <h4>ข้อที่ 1 ชื่อผลงาน</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
      <div className="d-flex" style={{fontSize: 20}}>
          <div style={{color: "#439EF9", fontSize: 20}}>{(data.c_name)}</div>
        </div>
      </div>
    </div>
  </div>



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
      <h4>ข้อที่ 3 ประเภทและข้อมูลของผู้ขอรับสิทธิบัตร / อนุสิทธิบัตร</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
      <div className="d-flex" style={{fontSize: 20}}>เลือก :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_type)}</div>
        </div>

      {form.f1_type === "บุคคลธรรมดา" ? (
      <div>
      <div className="d-flex" style={{fontSize: 20}}>ชื่อ :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.fname) + " " + (user.lname)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}>ที่อยู่ :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.address)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}>ตำบล/แขวง :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.district)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}>อำเภอ/เขต :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.sub_district)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}>จังหวัด :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.province)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}>รหัสไปรษณีย์ :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.postal)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}> ประเทศ/สัญชาติ :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>ไทย</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}> โทรศัพท์ :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.tel)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}> อีเมล :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.email)}</div>
        </div>
      <div className="d-flex" style={{fontSize: 20}}> เลขประจำตัวประชาชน :&nbsp;&nbsp;&nbsp;
          <div style={{color: "#439EF9", fontSize: 20}}>{(user.id_card)}</div>
        </div>
      </div>
      ):(
        <div>
        <div className="d-flex" style={{fontSize: 20}}>ชื่อ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_name)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>ที่อยู่ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_address)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>ตำบล/แขวง :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_district)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>อำเภอ/เขต :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_sub_district)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>จังหวัด :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_province)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>รหัสไปรษณีย์ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_postal)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> ประเทศ/สัญชาติ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>ไทย</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> โทรศัพท์ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_tel)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> อีเมล :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_email)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> เลขประจำตัวประชาชน/เลขทะเบียนนิติบุคคล :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f1_idcard)}</div>
          </div>
        </div>
      )}

      </div>
    </div>
  </div>



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingfour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsefour" aria-expanded="false" aria-controls="panelsStayOpen-collapsefour">
      <h4>ข้อที่ 4 สิทธิในการขอรับสิทธิบัตร / อนุสิทธิบัตร</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapsefour" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingfour">
      <div class="accordion-body">
        <div className="d-flex" style={{fontSize: 20}}>
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_type)}</div>
          </div>
      </div>
    </div>
  </div>


  {form.f3_check === "true" ? (
  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingfive">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsefive" aria-expanded="false" aria-controls="panelsStayOpen-collapsefive">
      <h4>ข้อที่ 5 ข้อมูลของตัวแทน</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapsefive" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingfive">
      <div class="accordion-body">
      <div>
        <div className="d-flex" style={{fontSize: 20}}>ตัวแทนเลขที่  :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_id)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>ชื่อ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_name)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>ที่อยู่ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_address)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>ตำบล/แขวง :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_district)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>อำเภอ/เขต :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_sub_district)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>จังหวัด :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_province)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}>รหัสไปรษณีย์ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_postal)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> ประเทศ/สัญชาติ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>ไทย</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> โทรศัพท์ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_tel)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> อีเมล :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_email)}</div>
          </div>
        <div className="d-flex" style={{fontSize: 20}}> เลขประจำตัวประชาชน :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>{(form.f3_idcard)}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  ):(<div></div>)}



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingsix">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsesix" aria-expanded="false" aria-controls="panelsStayOpen-collapsesix">
      <h4>ข้อที่ 6 ข้อมูลของผู้ประดิษฐ์ / ผู้ออกแบบผลิตภัณฑ์</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapsesix" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingsix">
      <div class="accordion-body">


        {(form.f1_type === "บุคคลธรรมดา" && form.f2_type === "เป็นผู้ประดิษฐ์ / ผู้ออกแบบ") || (form.f2_check === "true") ? (
        <div className="d-flex" style={{fontSize: 20}}> 
            <div style={{color: "#439EF9", fontSize: 20}}>ชื่อและที่อยู่เดียวกันกับผู้ขอ</div>
          </div>
        ):(
          <div>
          <div className="d-flex" style={{fontSize: 20}}>ชื่อ :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_name)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}>ที่อยู่ :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_address)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}>ตำบล/แขวง :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_district)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}>อำเภอ/เขต :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_sub_district)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}>จังหวัด :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_province)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}>รหัสไปรษณีย์ :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_postal)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}> ประเทศ/สัญชาติ :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>ไทย</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}> อีเมล :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_email)}</div>
            </div>
          <div className="d-flex" style={{fontSize: 20}}> เลขประจำตัวประชาชน :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>{(form.f2_idcard)}</div>
            </div>
          </div>
        )}


      </div>
    </div>
  </div>



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingseven">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseseven" aria-expanded="false" aria-controls="panelsStayOpen-collapseseven">
      <h4>ข้อที่ 13 จำนวนหน้าของเอกสาร</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseseven" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingseven">
      <div class="accordion-body">
        <div className="d-flex" style={{fontSize: 20}}>
              <div style={{color: "#439EF9", fontSize: 20}}>กรอกข้อมูลจำนวนหน้าของเอกสารที่มี</div>
            </div>
      </div>
    </div>
  </div>



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingeight">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseeight" aria-expanded="false" aria-controls="panelsStayOpen-collapseeight">
      <h4>ข้อที่ 14 เอกสารที่ใช้ในการขอ</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseeight" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingeight">
      <div class="accordion-body">
        <div className="d-flex" style={{fontSize: 20}}>เลือก :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>เอกสารแสดงสิทธิในการขอรับสิทธิบัตร/อนุสิทธิบัตร</div>
            </div>
        <div className="d-flex" style={{fontSize: 20}}>เลือก :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>หนังสือรับรองการแสดงการประดิษฐ์/การออกแบบผลิตภัณฑ์</div>
            </div>


        {form.f3_check === "true" ? (
        <div className="d-flex" style={{fontSize: 20}}>เลือก :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>หนังสือมอบอำนาจ</div>
            </div>
        ):(<div></div>)}

        <div className="d-flex" style={{fontSize: 20}}>เลือก (หากมีเอกสารอื่นๆ) :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>เอกสารอื่น ๆ</div>
            </div>
      </div>
    </div>
  </div>



  <div class="accordion-item mb-3">
    <h2 class="accordion-header" id="panelsStayOpen-headingnine">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsenine" aria-expanded="false" aria-controls="panelsStayOpen-collapsenine">
      <h4>ข้อที่ 15 รับรองผลงาน</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapsenine" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingnine">
      <div class="accordion-body">
        <div className="d-flex" style={{fontSize: 20}}>
              <div style={{color: "#439EF9", fontSize: 20}}>ตามข้อมูลผลงานของผู้ใช้</div>
            </div>
      </div>
    </div>
  </div>


  <div class="accordion-item mb-5">
    <h2 class="accordion-header" id="panelsStayOpen-headingten">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseten" aria-expanded="false" aria-controls="panelsStayOpen-collapseten">
      <h4>ข้อที่ 16 เซ็นชื่อรับรอง</h4>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseten" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingten">
      <div class="accordion-body">

        {form.f3_check === "true" ? (
        <div>
        <div className="d-flex" style={{fontSize: 20}}>เลือก :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>ตัวแทน</div>
            </div>
        <div className="d-flex" style={{fontSize: 20}}>เซ็นชื่อ :&nbsp;&nbsp;&nbsp;
            <div style={{color: "#439EF9", fontSize: 20}}>ให้ตัวแทนเซ็นชื่อ</div>
          </div>
        </div>
        ):(
          <div>
          <div className="d-flex" style={{fontSize: 20}}>เลือก :&nbsp;&nbsp;&nbsp;
                <div style={{color: "#439EF9", fontSize: 20}}>ผู้ขอรับสิทธิบัตร/อนุสิทธิบัตร</div>
              </div>
          <div className="d-flex" style={{fontSize: 20}}>เซ็นชื่อ :&nbsp;&nbsp;&nbsp;
              <div style={{color: "#439EF9", fontSize: 20}}>ผู้ขอรับสิทธิบัตร/อนุสิทธิบัตรเซ็นชื่อ</div>
            </div>
          </div>
        )}

      </div>
    </div>
  </div>



</div>
      </div>
    </React.Fragment>
  );
};

export default FormInfo;
