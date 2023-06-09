import './App.css'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Demo from './pages/Demo'
import Accueil from './pages/Accueil'
import Contact from './pages/Contact'
import Profile from './components/Profile'
import Exam from './components/Exam'
import Exercice from  './components/Exercice'
import RegisterAttendance from './components/RegisterAttendance'
import Attendance from './components/Attendance'
import CreateExam from './components/CreateExam'
import CreateExercice from './components/CreateExercice'
import Teachers_List from './components/Teachers_List'
import Notes from './components/Notes'
import Voir_Notes from './components/Voir_Notes'
import Dashboard from './components/Dashboard'
import Class from './components/Class'
import Admin from './components/Admin'
import AddAdmin from './components/AddAdmin'
import Teacher from './components/Teacher'
import AddTeacher from './components/AddTeacher'
import Student from './components/Student'
import AddStudent from './components/AddStudent'
import CreateSchedule from './components/CreateSchedule'
import Course from './components/Course'
import AddSchedule from './components/AddSchedule'
import AddPayment from './components/AddPayment'
import AllPayment from './components/AllPayment'
import StudentPayments from './components/StudentPayments'
import AddExam from './components/AddExam'
import UpdateExam from './components/UpdateExam'
function App() {
  return (
    <div>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/Login' element={<Login/>} />
      <Route path='/Demo' element={<Demo/>} />
      <Route path='/Contact' element={<Contact/>}/>
      <Route path='/Accueil' element={<Accueil/>}>
         <Route path='' element={<Dashboard/>}/>
         <Route path='dashboard' element={<Dashboard/>}/>
         <Route path='Profile' element={<Profile/>}/>
         <Route path='Exam' element={<Exam/>}/>
         <Route path='Exercice' element={<Exercice/>}/>
         <Route path='Student/Attendance' element={<RegisterAttendance/>}/>
         <Route path='Exam_List' element={<CreateExam/>}/>
         <Route path='Exercice_list' element={<CreateExercice/>}/>
         <Route path='Attendance' element={<Attendance/>}/>
         <Route path='Teacher_list' element={<Teachers_List/>}/>
         <Route path='Notes' element={<Notes/>}/>
         <Route path='exam-result' element={<Voir_Notes/>}/>
         <Route path='Class' element={<Class/>}/>
         <Route path='Admin' element={<Admin/>}/>
         <Route path='Admin/Add' element={<AddAdmin/>}/>
         <Route path='Teacher' element={<Teacher/>}/>
         <Route path='Teacher/Add' element={<AddTeacher/>}/>
         <Route path='Student' element={<Student/>}/>
         <Route path='Student/Add' element={<AddStudent/>}/>
         <Route path='Schedule' element={<CreateSchedule/>}/>
         <Route path='Course' element={<Course/>}/>
         <Route path='AddSchedule' element={<AddSchedule/>}/>
         <Route path='AddPayment' element={<AddPayment/>}/>
         <Route path='AllPayment' element={<AllPayment/>}/>
         <Route path='StudentPayments' element={<StudentPayments/>}/>
         <Route path='Exam/Add' element={<AddExam/>}/>
         <Route path='Exam/Update/:id' element={<UpdateExam/>}/>
      </Route>
     </Routes>
    </div>
  )
}

export default App
