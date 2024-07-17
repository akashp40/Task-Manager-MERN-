import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";

import { ToastContainer } from "react-toastify";
import { CreateTask, getAllTasks, deleteTaskById, updateTaskById } from "./Api";
import { notify } from "./Utils";

function TaskManager() {
  const [input, setInput] = useState(" ");
  const [tasks, setTasks] = useState([]);
  const [copyTask, setCopyTask] = useState([]);
  const [updateTask,setUpdateTask]=useState(null)
  //console.log(updateTask)

  const handleTask = ()=>{
    if(updateTask && input){
      //update api will be called
      const obj = {
        taskName : input,
        isDone : updateTask.isDone,
        _id : updateTask._id
      }
      handleUpdateItem(obj);

    }else if(updateTask === null && input){
      //create api call
      handleAddTask();

    }

    setInput(" ");
  }

  useEffect(()=>{
    if(updateTask){
      setInput(updateTask.taskName)
    }
  },[updateTask])


  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    //console.log(obj);
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        //show succes toast message
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }

      fetchAllTasks();
    } catch (err) {
      console.log(err);
      notify("failed to create task", "error");
    }
  };

  const fetchAllTasks = async () => {
    try {
      const { data } = await getAllTasks();
      console.log(data);
      setTasks(data);
      setCopyTask(data);
    } catch (err) {
      console.log(err);
      notify("failed to create task", "error");
    }
  };
  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    try {
      const { success, message } = await deleteTaskById(id);
      //console.log(data);
      if (success) {
        //show succes toast message
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.log(err);
      notify("failed to create task", "error");
    }
  };

  const handleCheckAndUnchecked = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: !isDone,
    };
    //console.log(obj)
    try {
      const { success, message } = await updateTaskById(_id, obj);
      //console.log(data);
      if (success) {
        //show succes toast message
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.log(err);
      notify("failed to create task", "error");
    }
  };


  const handleUpdateItem = async (item)=>{

    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };

    try {
      const { success, message } = await updateTaskById(_id, obj);
      //console.log(data);
      if (success) {
        //show succes toast message
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTasks();
    } catch (err) {
      console.log(err);
      notify("failed to create task", "error");
    }

  }

  const handleSearch = (e)=>{
    const term = e.target.value.toLowerCase();
    //console.log(term)
     const oldTask = [...copyTask];
     //console.log(oldTask);
     const result = oldTask.filter((item)=>item.taskName.toLowerCase().includes(term));
     setTasks(result);
  }
  return (
    <div
      className="d-flex flex-column align-items-center 
    w-50 m-auto mt-5"
    >
      <h1 className="mb-4">Task Manager App</h1>

      {/* Input and serach box */}
      <div
        className="d-flex justify-content-between 
      align-items-center mb-4 w-100"
      >
        <div className="input-group flex-grow-1 me-2">
          <input
            value={input}
            type="text"
            className="form-control me-1"
            placeholder="Add new Task"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
          <button
            className="btn btn-success btn-sm me-2"
            onClick={handleTask}
          >
            <FaPlus className="m-2" />
          </button>
        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />{" "}
          </span>
          <input
            className="form-control me-1"
            placeholder="Search tasks"
            onChange={handleSearch}
          ></input>
        </div>
      </div>

      {/* list of items */}
      <div className="d-flex flex-column w-100">
        {tasks.map((items) => (
          <div
            className="m-2 p-2 border bg-light width-100 rounded-3 d-flex
          justify-content-between align-items-center"
          >
            <span
              className={items.isDone ? "text-decoration-line-through" : " "}
            >
              {items.taskName}
            </span>
            <div>
              <button
                type="button"
                className="btn btn-success btn-sm me-2"
                onClick={() => {
                  handleCheckAndUnchecked(items);
                }}
              >
                {" "}
                <FaCheck />
              </button>
              <button type="button" className="btn btn-primary btn-sm me-2"
              onClick={()=>setUpdateTask(items)}>
                {" "}
                <FaPencilAlt />
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm me-2"
                onClick={() => {
                  handleDeleteTask(items._id);
                }}
              >
                {" "}
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toastify component */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
}

export default TaskManager;
