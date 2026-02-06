import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import SubPage from './pages/SubPage'
import TaskCollection from './pages/TaskCollection'
import MainPage from './pages/HomePage/MainPage'
import CreateTaskPage from './pages/CreateTaskPage/CreateTaskPage'

  

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/subpage" element={<SubPage />} />
      <Route path="/taskcollection" element={<TaskCollection/>} />
      <Route path="/create-task" element={<CreateTaskPage/>} />
      <Route path="/" element={<MainPage/>}></Route>
    </Routes>
  )
}

export default App;
