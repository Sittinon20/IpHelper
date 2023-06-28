import React, { useEffect, useState } from "react";
import "../../Css/Body_One.css";
import "../../Css/Button.css";
import "../../Css/Font.css";
import "../../Css/Subject.css";
import Navbar from "../../Components/Navbar";
import FilterMenu from "./components/index";
import axios from "axios"
import { getUser,getToken } from "../../Services/Authen"

const Card = () => {
  const [filterType, setFilterType] = useState([]);
  const [data, setData] = useState([]);

  function filerCard(filter) {
    if (filter !== "ทั้งหมด") {
      var newArray = data.filter(function (value) {
          if (filter === "สิทธิบัตร") {
            console.log(filter)
            return value.c_type === filter || value.c_type == "สิทธิบัตรการออกแบบผลิตภัณฑ์"
          }
          return value.c_type === filter
      });
      setFilterType(newArray);
    } else {
      setFilterType(data);
    }
  }

  const displayStatus = (status) => {
    if (status === "พร้อมกรอกและส่งเอกสาร") {
      return (<div style={{ color: "#38C162" }}>
                {status || ""}
              </div>)
    } else if (status === "ไม่สามารถจดทะเบียนได้") {
      return (<div style={{ color: "#F94343" }}>
                {status || ""}
              </div>)
    } else {
      return (<div style={{ color: "#eed202" }}>
                {status || ""}
              </div>)
    }
  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/card/${getUser()}`, {
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
        console.log('data',response.data)
        setData(response.data);
        setFilterType(response.data);
    })
    .catch((err) => {
      alert(err);
    });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container-md col-md-16">
        <FilterMenu filterValue={(filter) => filerCard(filter)} />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filterType.map((items) => (
            <a href={`/cardinfo/${items._id}`} key={items._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h4 className="card-title">{items.c_name}</h4>                
                  <div className="card-text">
                    ประเภท : {items.c_type || "ไม่มีข้อมูล"}
                  </div>
                  <div className="card-text d-flex">
                    สถานะ :&nbsp;
                    {displayStatus(items.status)}
                  </div>
                  <div className="card-text" style={{ color: "#9D9E9D" }}>
                    รายละเอียด : {items.c_comment || ""}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
