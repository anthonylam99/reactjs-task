import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTask] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTask(taskFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch Tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTask([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) +  1
    // const newTask = {id, ...task}
    // setTask([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    // console.log(id);
    setTask(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const update = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(update)
    })

    const data = await res.json()

    // setTask(tasks.map( 
    //     (task) =>  task.id === id ? {...task, reminder: !task.reminder} : task )
    //   )
    setTask(tasks.map(
      (task) => task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }

  const ShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="App">
        <Header onAdd={ShowAddTask} showAdd={showAddTask} />
        <Route 
          path='/'
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks')}
            </>
          )}
        /> 
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
