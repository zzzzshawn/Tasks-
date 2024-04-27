import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("");
  const [arr, setArr] = useState([]);
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'))
      setArr(todos)
    }
  }, [])


  const saveToLS = (updatedArr) => {
    localStorage.setItem('todos', JSON.stringify(updatedArr))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckChange = (e) => {
    let id = e.target.id
    let index = arr.findIndex((item) => {
      return item.id === id
    })
    let newArr = [...arr];
    newArr[index].complete = !newArr[index].complete;
    setArr(newArr);
    saveToLS(newArr);
  }

  const handleAdd = () => {
    const updatedArr = [...arr, { id: uuidv4(), todo, complete: false }];
    setArr(updatedArr);
    setTodo("");
    saveToLS(updatedArr);
  }

  const handleEdit = (id) => {
    const item = arr.find(item => item.id === id);
    if (item) {
      setTodo(item.todo);
    }
    const updatedArr = arr.filter(item => item.id !== id);
    setArr(updatedArr);
    saveToLS(updatedArr);
  }

  const handleDelete = (id) => {
    const updatedArr = arr.filter(item => item.id !== id);
    setArr(updatedArr);
    saveToLS(updatedArr);
  }

  const toggleFinish = () => {
    setFinished(!finished)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto  border rounded-md min-h-[80vh] lg:max-w-[60%] lg:mt-5 shadow-md">
        <div className=" p-8 font-bold flex flex-col justify-center items-start border-y pb-5" >
          <h2 className='mx-4'>Add Item</h2>
          <div className='w-full  px-2 flex my-1'>
            <input value={todo} placeholder='Enter text here.' onChange={handleChange} className='w-1/2 border-2 rounded-md font-light p-1' type="text" id='addText' />
            <button disabled={!todo} className={`bg-black text-white px-2 rounded-md mx-2 font-medium active:border-white ${!todo && "opacity-40"} `} onClick={handleAdd}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill='#fff' /></svg>
            </button>
          </div>

        </div>
        <div className="p-8 font-bold flex flex-col justify-center items-start min-h-full ">
          <h2 className='mx-4 mb-3'>Your Todos:</h2>
          <div className='flex gap-2 mx-4 accent-green-500 mb-3'>
            <label className="switch">
              <input onChange={toggleFinish} type="checkbox" checked={finished} />
              <span className="slider round"></span>
            </label>
            <p className='font-medium'>
              Show completed Todos
            </p>
          </div>
          {arr.length === 0 && <div className='text-sm font-light mx-4'>Nothing to display...</div>}
          {arr.map((item) => {
            return (!finished || item.complete) && <div key={item.id} className="border-2 p-1 max-w-[86%] container mx-auto rounded-md px-3 flex gap-3 justify-between text-sm font-normal items-center my-2">
              <div className="w-3/4  flex p-2 break-all">
                <input type="checkbox" id={item.id} onChange={handleCheckChange} className='accent-green-500' checked={item.complete} />
                <p className={`${item.complete ? "line-through" : ""} ml-3 `} > {item.todo}</p>
              </div>
              <div className="btn mx-1 max-w-1/5 flex flex-nowrap">
                <button className='bg-black rounded-md p-1 mx-2' onClick={() => { handleEdit(item.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" fill='#fff' /></svg>
                </button>
                <button className='bg-black rounded-md p-1' onClick={() => { handleDelete(item.id) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" fill='#fff' /></svg>
                </button>
              </div>
            </div>

          })}
        </div>
      </div>

    </>
  )
}

export default App
