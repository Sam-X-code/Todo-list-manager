import { useState, useEffect } from 'react'
import Navbaar from './components/Navbaar'
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState()
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = (e) => {
    setShowfinished(!showfinished)
  }


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('')
    savetoLS()
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id;
    })
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    savetoLS()
  }


  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })

    setTodos(newTodos)
    savetoLS()
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
    savetoLS()
  }
  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS()
  }

  return (
    <>
      <Navbaar />
      <div className="mx-3 md:container my-5 p-5 rounded-xl bg-fuchsia-100 min-h-[80vh] md:w-[50vw] md:mx-auto">
        <div className='font-bold text-xl text-center mb-4 text-pink-500 '> My Todo - Helps Things Easy To Remember!</div>
        <div className="addTodo">
          <h1 className='text-2xl text-center font-bold mb-2 text-violet-500'>Add Todo</h1>
          <div className="save flex flex-col gap-2 items-center">
            <input onChange={handleChange} value={todo} type="text" placeholder='Add your work' className='w-3/4 h-12 bg-blue-50 px-2 border-2 border-black' />
            <button onClick={handleAdd} className='bg-violet-400 text-amber-50 py-0.5 rounded-xl w-3/4 border-2 border-black'>Save</button>
          </div>

        </div>

        <input onChange={toggleFinished} type="checkbox" checked={showfinished} className='mt-5' />     Show Finished

        <h2 className='text-2xl text-center font-bold mt-1 text-violet-500'>Your Todo's</h2>
        <div className="todos">
          {todos.length === 0 && <div className='justify-center font-bold my-7'>NO TODO's TO DISPLAY</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between text-wrap my-2">
              <div className='flex md:w-2/3 w-1/2'>
                <input onChange={handleCheckbox} name={item.id} className='mr-2' type="checkbox" checked={item.isCompleted} /> 
                <div className={`${item.isCompleted ? "line-through" : ""} py-1 w-full  sm:bg-violet-200 rounded-xl pl-2`}
                >{item.todo}</div>
              </div>

              <div className="buttons">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='mx-2  bg-violet-400 text-center text-amber-50 rounded-md h-9 w-10 px-2.5 border-2 border-black'><MdOutlineEditCalendar /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='mx-2 bg-violet-400 text-center text-amber-50 rounded-md h-9 w-10 px-2.5 border-2 border-black'><MdDelete /></button>
              </div>
            </div >
          })}
        </div>
      </div>

    </>
  )
}

export default App
