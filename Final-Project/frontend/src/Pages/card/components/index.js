import React, { useEffect, useState } from "react";
import axios from "axios"
import swal from "sweetalert2"
import { getUser, getToken } from "../../../Services/Authen"

const FilterMenu = (props) => {
  const [filter, setFilter] = useState({
    all: "activec",
    copyright: "",
    patent: "",
    desire: "",
    subpatent: "",
  });

  const [form , setForm]= useState ({
    email: "",
    c_name:"",
    c_comment:""
})

const submit = () =>{
    if(form.c_name){
      console.log('บันทึกข้อมูล', getUser() )
      axios.post(`${process.env.REACT_APP_API}/card`, {data:form} )
      .then((response) => {
        swal
          .fire("แจ้งเตือน", `เสร็จสิ้น`, "success")
          .then((response) => {
           window.location.reload()
          });
      })
      .catch((err) => {
        swal.fire("แจ้งเตือน", `${err.response.data.error}`, "warning");
      });
    }
}

useEffect(() => {
  const email = getUser();
  setForm({...form, email: email})
}, [])

  const handleValueChange = (filter) => {
    switch (filter) {
      case "ทั้งหมด":
        setFilter({ all: "activec", copyright: "", patent: "", subpatent: "" });
        break;
      case "ลิขสิทธิ์":
        setFilter({ all: "", copyright: "activec", patent: "", subpatent: "" });
        break;
      case "สิทธิบัตร":
        setFilter({ all: "", copyright: "", patent: "activec", subpatent: "" });
        break;
      case "อนุสิทธิบัตร":
        setFilter({ all: "", copyright: "", patent: "", subpatent: "activec" });
        break;
      default:
        setFilter({ all: "activec", copyright: "", patent: "", subpatent: "" });
        break;
    }
    props.filterValue(filter);
  };

  return (
    <ul className="nav nav-pills p-3 bg-white mb-4 rounded-pill filter mtf justify-content-evenly">
      <li className="nav-item ">
        <button
          onClick={() => handleValueChange("ทั้งหมด")}
          className={`nav-link fil rounded-pill  d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${filter.all}`}
        >
          <span className="d-none d-md-block ">ทั้งหมด</span>
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => handleValueChange("ลิขสิทธิ์")}
          className={`nav-link fil rounded-pill  d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${filter.copyright}`}
        >
          <span className="d-none d-md-block">ลิขสิทธิ์</span>
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => handleValueChange("สิทธิบัตร")}
          className={`nav-link fil rounded-pill  d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${filter.patent}`}
        >
          <span className="d-none d-md-block">สิทธิบัตร</span>
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => handleValueChange("อนุสิทธิบัตร")}
          className={`nav-link fil rounded-pill  d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 ${filter.subpatent}`}
        >
          <span className="d-none d-md-block">อนุสิทธิบัตร</span>
        </button>
      </li>
      <li className="nav-item ml-auto">
      <button  className="nav-link btn-primary rounded-pill d-flex px-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          <span className="d-none d-md-block font-14 ">เพิ่มผลงาน</span>
          <i className="bi bi-plus-circle" />
          </button>
      </li>

      {/* popup */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel" >เพิ่มผลงาน</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body"> 
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="note-title">
                                            <label>ชื่อผลงาน</label>
                                            <input type="text" className="form-control" rows="2" onChange={(e)=> setForm({...form , c_name:e.target.value})} required/>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="note-description">
                                            <label>รายละเอียด</label>
                                            <textarea  className="form-control" rows="3" onChange={(e)=> setForm({...form , c_comment:e.target.value})}></textarea>
                                        </div>
                                    </div>
                                </div>         
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
                                <button type="button" className="btn btn-primary" style={{backgroundColor:'#293c6e'}}  onClick={()=> submit()}>บ้นทึก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    </ul>
  );
};

export default FilterMenu;
