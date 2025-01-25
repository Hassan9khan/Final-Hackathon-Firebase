import React, { useEffect, useRef, useState } from "react";
import { getAuth, signOut , onAuthStateChanged  } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([]);
  const title = useRef();
  const description = useRef();
  const navigate = useNavigate();

  const getValue = async (event) => {
    event.preventDefault();

    const info = {
      title: title.current.value,
      description: description.current.value,
    };

    if (!info.title || !info.description) {
      alert("Both Title and Description are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/todo",
        info
      );
      console.log(response.data);
      setData((prevData) => [...prevData, response.data]);
      title.current.value = "";
      description.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    axios
      .get("http://localhost:3000/api/v1/todos")
      .then((response) => {
        console.log(response.data.todos);
        setData(response.data.todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteData = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/todo/${id}`)
      .then((response) => {
        console.log(response.data);
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editData = (id, updatedTitle, updatedDescription) => {
    if (!updatedTitle || !updatedDescription) {
      alert("Both fields are required!");
      return;
    }

    const updatedData = {
      title: updatedTitle,
      description: updatedDescription,
    };

    axios
      .put(`http://localhost:3000/api/v1/todo/${id}`, updatedData)
      .then((response) => {
        console.log(response.data);

        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...updatedData } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating the item:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onAuth = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        
      } else {
        navigate("/login")
      }
    });
  };
  useEffect(() => {
    onAuth();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="text-end m-2">
        <button onClick={logout} className="btn btn-info">
          Logout
        </button>
      </div>
      <form onSubmit={getValue}>
        <div>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-info w-full max-w-xs m-2"
            ref={title}
          />
        </div>
        <div>
          <textarea
            className="textarea textarea-primary w-full max-w-xs m-2"
            placeholder="Description"
            ref={description}
          ></textarea>
        </div>
        <button className="btn btn-primary m-2" type="submit">
          Submit
        </button>
      </form>

      <div>
        <button className="btn btn-success text-white m-2" onClick={getData}>
          Get All Data
        </button>
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="flex justify-between border-2 m-3 p-3">
              <div>
                <h1 className="font-bold">Title: {item.title}</h1>
                <p>Description: {item.description}</p>
                <p>ID: {item._id}</p>
              </div>
              <div>
                <button
                  onClick={() =>
                    editData(
                      item._id,
                      prompt("Enter new title:", item.title),
                      prompt("Enter new description:", item.description)
                    )
                  }
                  className="btn btn-sm m-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteData(item._id)}
                  className="btn btn-sm "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
