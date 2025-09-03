import { useEffect, useState } from "react";
import "./App.css";
import { Data } from "./EMdata";

function App() {
  const [data, setdata] = useState([]);
  const [Id, setId] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
  const [isupdate, setisupdate] = useState(false);

  useEffect(() => {
    setdata(Data);
  }, []);

  const handleEdit = (Id) => {
    const dt = data.filter((item) => item.Id === Id);
    if (dt !== undefined) {
      setisupdate(true);
      setId(Id);
      setFirstName(dt[0].FirstName);
      setLastName(dt[0].LastName);
      setAge(dt[0].Age);
    }
  };
  const handleDel = (Id) => {
    if (Id > 0) {
      if (window.confirm("Are You Sure !!! Delete kr du ")) {
        const del = data.filter((item) => item.Id !== Id);
        setdata(del);
      }
    }
  };

  const handleClear = (Id) => {
    setId("");
    setFirstName("");
    setLastName("");
    setAge("");
    setisupdate(false);
  };

  const handleSave = (e) => {
    let error = "";

    if (Id === "") error += "Id is Required , ";
    if (FirstName === "") error += "First Name is Required , ";
    if (LastName === "") error += "Last Name is Required, ";
    if (Age <= 0 && Age === '') error += "Age is Required .";
    
    if (error === ''){

    e.preventDefault();
    const NewObj = {
      Id: Id,
      FirstName: FirstName,
      LastName: LastName,
      Age: Age,
    };

    const dt = [...data];
    dt.push(NewObj);
    setdata(dt);
    handleClear();
  }
  else{
    alert(error);
  }
  };

  const handleUpdate = () => {
    const index = data
      .map((item) => {
        return item.Id;
      })
      .indexOf(Id);

    const dt = [...data];
    dt[index].Id = Id;
    dt[index].FirstName = FirstName;
    dt[index].LastName = LastName;
    dt[index].Age = Age;

    setdata(dt);
    handleClear();
  };

  return (
    <>
      <h2>CURD Operation</h2>

      <div className="glass-card form-container">
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => setId(e.target.value)}
          value={Id}
        />
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          value={FirstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          value={LastName}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
          value={Age}
        />
        <div>
          {!isupdate ? (
            <button className="save" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="save" onClick={() => handleUpdate()}>
              Update
            </button>
          )}
          <button className="clear" onClick={() => handleClear()}>
            Clear
          </button>
        </div>
      </div>

      <div className="glass-card table-container">
        <table>
          <thead>
            <tr>
              <td>Sno.</td>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.Id}>
                <td>{index + 1}</td>
                <td>{item.Id}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Age}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(item.Id)}>
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDel(item.Id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
