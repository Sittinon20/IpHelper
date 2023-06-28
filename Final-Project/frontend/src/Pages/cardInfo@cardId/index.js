import React, { useEffect, useState } from "react";
import "../../Css/Body_One.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import "../../Css/Subject.css";
import "../../Css/Info.css";
import Navbar from "../../Components/Navbar";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getUser, getToken } from "../../Services/Authen";

const Cardinfo = () => {
  const { id: _id } = useParams();
  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);

  const handleUpdate = () => {
    if (data.c_name) {
      Swal.fire({
        title: "ยืนยันการอัพเดตข้อมูล ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`${process.env.REACT_APP_API}/cardinfo/${_id}`, { data: data })
            .then((response) => {
              Swal.fire("อัพเดตข้อมูลสำเร็จ!", "", "success").then((result) => {
                window.location.reload();
              });
            })
            .catch((err) => {
              Swal.fire("แจ้งเตือน", `${err.response.data.error}`, "warning");
              window.location.reload();
            });
        }
      });
    }
  };

  const displayStatus = (status) => {
    if (status === "พร้อมกรอกและส่งเอกสาร") {
      return (<div style={{ color: "#38C162", fontSize: 18 }}>
      {status || (
        <a className="card-text type">ไม่มีข้อมูล</a>
      )}
    </div>)
    } else if (status === "ไม่สามารถจดทะเบียนได้") {
      return (<div style={{ color: "#F94343", fontSize: 18 }}>
      {status || (
        <a className="card-text type">ไม่มีข้อมูล</a>
      )}
    </div>)
    } else {
      return (
        <div style={{ color: "#eed202", fontSize: 18 }}>
        {status || (
          <a className="card-text type">ไม่มีข้อมูล</a>
        )}
      </div>)
    }
  }

  const handleInputType = () => {
    window.location = `/question/${_id}`;
  };

  const handleInputForm = () => {
    window.location = `/form/${_id}`;
  };


  const handleDelete = () => {
    Swal.fire({
      title: "ยืนยันการลบข้อมูล ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API}/form/${_id}`, {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        });
        axios.delete(`${process.env.REACT_APP_API}/cardinfo/${_id}`, {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        });
        Swal.fire("ลบข้อมูลสำเร็จ!", "", "success").then((result) => {
          if (result.isConfirmed) {
            window.location = `/card/${getUser()}`;
          }
        });
      }
    });
  };

  const displayType = (type) => {
    if (type === "ลิขสิทธิ์") {
      return (<div
        class="accordion"
        id="accordionPanelsStayOpenExample"
      >
        <div class="accordion-item">
          <h2
            class="accordion-header"
            id="panelsStayOpen-headingOne"
          >

            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              <label className="form-check-label">
              สถานที่ในการขอรับการจดทะเบียน
              </label>
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div class="accordion-body">
            <strong className="d-flex justify-content-between">
                  ปัจจุบันกรมทรัพย์สินทางปัญญาได้กำหนดให้แจ้งข้อมูลลิขสิทธิ์ทางเว็บไซต์เท่านั้น
                  <u className="go">
                    <a
                      className="go"
                      href="https://copyright.ipthailand.go.th/application/form-1/create"
                      target="_blank"
                    >
                      เว็บไซต์
                    </a>
                  </u>
                </strong>
            </div>
          </div>
        </div>
      </div>)
    } else {
      return (<div></div>)
    }
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/cardinfo/${_id}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setData(response.data);
        if(response.data.c_type !== "ลิขสิทธิ์" && response.data.c_type !== "ไม่สามารถจดทะเบียนได้" && response.data.status === "พร้อมกรอกและส่งเอกสาร") {
          console.log("เข้า",response.data.c_type)
          axios
            .get(`${process.env.REACT_APP_API}/form/${_id}`, {
              headers: {
                authorization: `Bearer ${getToken()}`,
              },
            })
            .then((response) => {
              console.log("data", response.data);
              setForm(response.data);
            })
            .catch((err) => {
              alert(err);
            });
          }
      })
      .catch((err) => {
        alert(err);
      });

  }, [_id]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container-xl px-4 mt-5 mtf alignments-center justify-content-center">
        <div className="row alignments-center justify-content-center">
          <div className="col-xl-12 alignments-center justify-content-center">
            <div className="card mb-4">
              <div className="card-body">
                <form>
                  <div className="gx-4 mb-3">
                    <div className="col-md-10 cardd">
                      <h5 className="mb-2 mr-4">ชื่อผลงาน :&nbsp;&nbsp;</h5>
                      <input
                        type="text"
                        className="form-control ml-4"
                        name="s-name"
                        value={data.c_name && data.c_name}
                        required
                        onChange={(e) =>
                          setData({ ...data, c_name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="gx-4 mb-3">
                    <div className="col-md-10 cardd">
                      <h5 className="mb-2">รายละเอียด :</h5>
                      <textarea
                        type="text"
                        className="form-control"
                        cols="40"
                        style={{ alignContent: "center", overflow: "auto" }}
                        value={data.c_comment && data.c_comment}
                        rows={6}
                        onChange={(e) =>
                          setData({ ...data, c_comment: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="gx-3 mb-3">
                    <div className="col-md-10 d-flex">
                      <h5 className="mb-1">ประเภท :</h5>
                      <div style={{ color: "#5072a7", fontSize: 18 }}>
                        {data.c_type || (
                          <div style={{ color: "#5072a7", fontSize: 18 }}>ไม่มีข้อมูล</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="gx-3 mb-3">
                    <div className="col-md-10 cardd">
                      <h5 className="mb-1">สถานะ :</h5>
                      {displayStatus(data.status)}
                    </div>
                  </div>

                  {data.c_type && (
                    <>
                      <div className="gx-3 mb-3">
                        <div className="col-md-6 cardd">
                          <h5 className="mb-1">
                            ขั้นตอน :&nbsp;&nbsp;
                            {(data.c_type === "สิทธิบัตร" ||
                            data.c_type === "อนุสิทธิบัตร" || data.c_type === "สิทธิบัตรการออกแบบผลิตภัณฑ์") && data.status !== "พร้อมกรอกและส่งเอกสาร" ? (
                              <>
                                <button
                                  className="btn btn-primary"
                                  type="button"
                                  onClick={() => handleInputForm()}
                                >
                                  ตอบคำถามแบบฟอร์ม
                                </button>
                                <br />
                              </>
                            ) : (
                              <div />
                            )}
                          </h5>
                        </div>
                      </div>

                      {((data.c_type === "สิทธิบัตร" || data.c_type === "อนุสิทธิบัตร" || data.c_type === "สิทธิบัตรการออกแบบผลิตภัณฑ์")) ? (
                        <>
  
                          <div className="accordion " id="accordionExample">
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      เตรียมเเบบฟอร์ม
                                    </label>
                                  </div>
                                </button>
                              </h2>

                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <strong className="d-flex justify-content-between">
                                    1. แบบ สป/สผ/อสป/001-ก
                                    คำขอรับสิทธิบัตร/อนุสิทธิบัตร
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="http://ipthailand.go.th/images/patentOCR/30052018/1_1_001-A-17052018.pdf"
                                        target="_blank"
                                      >
                                        ดาวน์โหลดเอกสาร
                                      </a>
                                    </u>
                                  </strong>
                                  <br />
                                  <a className="d-flex justify-content-between">
                                    - ตัวอย่างการกรอกเอกสาร
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="http://ipthailand.go.th/images/3534/2564/Patent/FormEx/1.%20[001-%E0%B8%81]%20%E0%B8%84%E0%B8%B3%E0%B8%82%E0%B8%AD%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3.pdf"
                                        target="_blank"
                                      >
                                        ตัวอย่าง
                                      </a>
                                    </u>
                                  </a>
                                  <br />

                                  {data.status === "พร้อมกรอกและส่งเอกสาร" ? (
                                  <div>
                                  <a className="d-flex justify-content-between">
                                    - ตัวช่วยการกรอกเอกสาร
                                    <u className="go">
                                      <a
                                        className="go"
                                        href= {(`/forminfo/${_id}`)}
                                        target="_blank"
                                      >
                                        ตัวช่วย
                                      </a>
                                    </u>
                                  </a>
                                  </div>
                                  ):(<div></div>)}
                                  
                                  <hr />
                                  <strong className="d-flex justify-content-between">
                                    2. แบบ สป/สผ/อสป/001-ก(พ) คำรับรองเกี่ยวกับสิทธิขอรับสิทธิบัตร/อนุสิทธิบัตร
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="http://ipthailand.go.th/images/patentOCR/30052018/1_3_001-A_P-17052018.pdf"
                                        target="_blank"
                                      >
                                        ดาวน์โหลดเอกสาร
                                      </a>
                                    </u>
                                  </strong>
                                  <br />
                                  <a className="d-flex justify-content-between">
                                    - ตัวอย่างการกรอกเอกสาร
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="http://ipthailand.go.th/images/3534/2564/Patent/FormEx/3.%20[001-%E0%B8%81%20(%E0%B8%9E)]%20%E0%B8%84%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%A7%E0%B8%81%E0%B8%B1%E0%B8%9A%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4.pdf"
                                        target="_blank"
                                      >
                                        ตัวอย่าง
                                      </a>
                                    </u>
                                  </a>

                                  {(form.f3_check === "true" || form.f_check === "true") ? (
                                  <div>
                                  <hr/>
                                  <strong className="d-flex justify-content-between">
                                    3. แบบฟอร์มเพิ่มเติม
                                  </strong>
                                  <br />

                                  {form.f3_check === "true" ? (
                                  <div>
                                  <a className="d-flex justify-content-between">
                                    - ใบมอบอำนาจ ( กรณีมีตัวแทน )
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="https://www.rd.go.th/fileadmin/tax_pdf/others/give_authorize_230457.pdf"
                                        target="_blank"
                                      >
                                        ดาวน์โหลดเอกสาร
                                      </a>
                                    </u>
                                  </a>
                                  <br />
                                  </div>
                                  ):(<div></div>)}

                                  {form.f_check === "true" ? (
                                  <div>
                                  <a className="d-flex justify-content-between">
                                    - ใบต่อแนบท้าย ( กรณีมี "ผู้ขอรับ / ตัวแทน / ผู้ประดิษฐ์ / ผู้ออกแบบผลิตภัณฑ์" มากกว่า 1 คน )
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="http://ipthailand.go.th/images/FormPatent15080661.pdf"
                                        target="_blank"
                                      >
                                        ดาวน์โหลดเอกสาร
                                      </a>
                                    </u>
                                  </a>
                                  <br />
                                  </div>
                                  ):(<div></div>)}


                                  
                                  </div>
                                  ):(<div></div>)}



                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingTwo">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      เตรียมเอกสาร
                                    </label>
                                  </div>
                                </button>
                              </h2>
                              <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <strong className="d-flex justify-content-between">
                                    1. บัตรประจำตัวประชาชน ( สำเนา 1 ฉบับ ) <div style={{ color: "#3346FF" }}>( จำเป็น )</div>
                                  </strong>
                                  <br />
                                  <strong className="d-flex justify-content-between">
                                    2. รายละเอียดการประดิษฐ์  <div style={{ color: "#3346FF" }}>( จำเป็น )</div>
                                  </strong>
                                  <br />
                                  <strong className="d-flex justify-content-between">
                                    3. ข้อถือสิทธิ  <div style={{ color: "#3346FF" }}>( จำเป็น )</div>
                                  </strong>
                                  <br />
                                  <strong className="d-flex justify-content-between">
                                    4. บทสรุปการประดิษฐ์ <div style={{ color: "#3346FF" }}>( จำเป็น )</div>
                                  </strong>
                                  <br />
                                  <strong className="d-flex justify-content-between">
                                    5. รูปเขียน <div style={{ color: "#3346FF" }}>( ถ้ามี )</div>
                                  </strong>
                                  <br/>

                                  { (form.f1_type !== "บุคคลธรรมดา" || form.f3_check === "true") && data.status === "พร้อมกรอกและส่งเอกสาร" ? (
                                  <div>
                                  <strong className="d-flex justify-content-between">
                                    6. เอกสารเพิ่มเติม
                                  </strong>
                                  <br/>


                                  <div>
                                  <strong className="d-flex justify-content-between">
                                    - หนังสือแสดงการเป็นนายจ้างของผู้ประดิษฐ์ <div style={{ color: "#3346FF" }}>( กรณีที่ผู้ขอเป็นนายจ้างผู้ประดิษฐ์ / ผู้ออกแบบผลิตภัณฑ์ )</div>
                                  </strong>
                                  <br/>
                                  <strong className="d-flex justify-content-between">
                                    - หนังสือรับรองนิติบุคคล โดยมีคำรับรองของผู้มีอำนาจตามกฎหมายไม่เกิน 6 เดือนนับแต่วันที่ออกหนังสือรับรองในกรณีเป็น ( สำเนา 1 ฉบับ )
                                    <div style={{ color: "#3346FF" }}>( กรณีผู้ขอเป็นนิติบุคคล )</div>
                                  </strong>
                                  <br />  
                                  </div>  
                                                    
                                    <div>
                                  <strong className="d-flex justify-content-between">
                                    - บัตรประจำตัวประชาชนผู้รับมอบอำนาจ ( สำเนา 1 ฉบับ ) <div style={{ color: "#3346FF" }}>( กรณีมีตัวแทน )</div>
                                  </strong>
                                  <br />
                                  </div>                              
                                  </div>

                                  ):(<div></div>)}


                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id="headingThree"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  <div className="form-check">
                                    <label className="form-check-label">
                                      สถานที่ในการขอรับการจดทะเบียน
                                    </label>
                                  </div>
                                </button>
                              </h2>
                              <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <strong className="d-flex justify-content-between">
                                    1. กรมทรัพย์สินทางปัญญา ( ชั้น 3 )
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="https://www.google.com/maps/place/%E0%B8%81%E0%B8%A3%E0%B8%A1%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%9E%E0%B8%A2%E0%B9%8C%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2/@13.8823495,100.4867625,15z/data=!4m5!3m4!1s0x0:0xd9ca53d88bf5ede2!8m2!3d13.8823256!4d100.4867923"
                                        target="_blank"
                                      >
                                        ที่อยู่
                                      </a>
                                    </u>
                                  </strong>
                                  <br />
                                  <strong className="d-flex justify-content-between">
                                    2. สํานักงานพาณิชย์ ( ทุกจังหวัด )
                                    <u className="go">
                                      <a
                                        className="go"
                                        href="https://www.google.com/search?q=%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B2%E0%B8%93%E0%B8%B4%E0%B8%8A%E0%B8%A2%E0%B9%8C+&rlz=1C1ONGR_enTH957TH957&biw=1920&bih=937&tbm=lcl&sxsrf=ALiCzsan4nnP7UqeBZi9K_sh0Rn3wF9D4A%3A1653278407786&ei=xwaLYrHQL4i-3LUPo9KSkA8&oq=%E0%B8%AA%E0%B9%8D%E0%B8%B2%E0%B8%99%E0%B8%B1%E0%B8%81%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%9E%E0%B8%B2%E0%B8%93%E0%B8%B4%E0%B8%8A%E0%B8%A2%E0%B9%8C+&gs_l=psy-ab.12..35i39k1l3j0i512k1l7.10618.10618.0.11605.1.1.0.0.0.0.83.83.1.1.0....0...1c.1.64.psy-ab..0.1.83....0.Li_3ZigUI7E#rlfi=hd:;si:;mv:[[14.8855091,101.40558879999999],[13.2755972,99.9821915]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2"
                                        target="_blank"
                                      >
                                        ที่อยู่
                                      </a>
                                    </u>
                                  </strong>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>{displayType(data.c_type)}</div>
                      )}
                    </>
                  )}

                  {data.c_type == null ? (
                    <>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => handleInputType()}
                      >
                        ตอบคำถามแยกประเภท
                      </button>
                      <br />
                      <br />
                    </>
                  ) : (
                    <div />
                  )}
                  <div className="mt-5 text-center justify-content-center justify-content-center">
                    <button
                      className="btn profile-button"
                      type="button"
                      onClick={() => handleDelete()}
                    >
                      ลบ
                    </button>
                    <button
                      className="btn profile-button"
                      type="button"
                      onClick={() => handleUpdate()}
                    >
                      บันทึก
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cardinfo;
