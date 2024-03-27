import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "./store";
import './app.scss'
import { FormEvent, useState } from "react";
import apis from "./apis";
import { message } from "antd";
import { taskAction } from "./store/slices/task.slice";

export default function App() {
  const dispatch = useDispatch()
  const taskStore = useSelector((store: StoreType) => store.taskStore)
  const [checked, setChecked] = useState(false)

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    try {
      let data = {
    
        title: (e.target as any).name.value
       
      }

      let result = await apis.taskApi.create(data)
      
      if (result.status != 200) {
        throw {
          message: "Create Task Fail"
        }  
      }
      message.success("Create Task Success")
      dispatch(taskAction.addTask(result.data.data))
    } catch (err) {
      message.error("Create Task Fail")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      let result = await apis.taskApi.delete(id)
      if (result.status != 200) {
        throw {
          message: "Delete Task Fail"
        }  
      }
      message.success("Delete Task Success")
      dispatch(taskAction.deleteTask(result.data.data.id))
      
    }catch(err){
      message.error("Delete Task Fail")
    }
  }
  return (
    <div className="app">
      <div className="container">
        <div className="headerContainer">
          <h3>Todo List</h3>
          <p>Get things done, one item at a time.</p>
        </div>
        <div className="bodyContainer">
          <div className="listTask">
            {
              taskStore.data?.map((item) => {
                return <div className='itemTask' key={item.id}><h3 style={{ textDecoration: checked ? 'line-through' : 'none' }}>{item.title}</h3><div>
                  <i onClick={() => {
                    setChecked(!checked)
                  }} className={checked ? "fa-solid fa-square-check" : "fa-regular fa-square-check"}></i>
                  <i onClick={() => {
                    handleDelete(item.id)
                  }} className="fa-solid fa-trash-can"></i></div></div>
              })
            }
          </div>
          <div className='formInput'>
            <h5>Add to the todo list</h5>
            <form onSubmit={(e) => {
              handleAdd(e)
            }}>
              <input type="text" placeholder='Enter your todo' name='name' />
              <button type='submit'>Add Item</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}