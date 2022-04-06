import React, { useEffect, useState } from "react";

function Table() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [disbtn, setdisbtn] = useState("none")
 const [userid, setUserId] = useState(null)
 const [upbtn, setupbtn] = useState(true)

  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3000/posts").then((result) => {
      result.json().then((res) => {
        console.warn("result", res);
        setData(res);
        
        


        
        // setName(res[0].name);
        // setEmail(res[0].email);
        // setMobile(res[0].mobile);
        // setUserId(res[0].userid);
      });
    });
  }

  function submitdata() {
    // console.warn(alldata.name, alldata.email, alldata.mobile);
    let datas = { name, email, mobile };
    fetch("http://localhost:3000/posts/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      console.warn(result);
      result.json().then((res) => {
        console.warn("Response: ", res);

        getData();
        setName("");
        setEmail("");
        setMobile("");
      });
    });
  }

  function remove(id) {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((res) => {
        console.warn("response:  ", res);
        getData();
      });
    });
  }
  function select(id) {
    // console.warn("ID is: ", id);
    console.warn("Id is",data[id-1]);
    setName(data[id-1].name);
    setEmail(data[id-1].email);
    setMobile(data[id-1].mobile);
    setUserId(data[id-1].id);
    setupbtn(false);
    setdisbtn("");

  }

  function updatedata(){
    let datas = { name, email, mobile, userid};
    fetch(`http://localhost:3000/posts/${userid}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    }).then((result) => {
      console.warn(result);
      result.json().then((res) => {
        console.warn("Response: ", res);

        getData();
        setName("");
        setEmail("");
        setMobile("");
      });
    });

  }
    

  return (
    <div>
      <h1 style={{ backgroundColor: "grey" }}>Get All Data</h1>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Operations</th>

            </tr>
          </thead>
          {data.map((item, id) => (
            <tbody key={id}>
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary text-black bg-danger"
                    onClick={() => remove(item.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary text-black bg-danger"
                    onClick={() => select(item.id)
                      
                    
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="container mt-5">
      <input
          type="text"
          placeholder="enter your name..."
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br /> <br />
        <input
          type="email"
          placeholder="enter your email..."
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br /> <br />
        
        <input
          type="text"
          placeholder="enter your mob. num..."
          name="mobile"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <br /> <br />
        <button onClick={submitdata} className="btn btn-sm btn-primary" >
          Submit
        </button>
        <button onClick={updatedata} disabled={upbtn}  className="btn btn-sm btn-primary" style={{"marginLeft":"10px","display":`${disbtn}`}}>
          update
        </button>
      </div>
    </div>
  );
}

export default Table;
