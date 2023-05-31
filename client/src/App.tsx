import { Routes, Route } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import NavigationHeader from './components/NavigationHeader'
import TopNavbar from './components/TopNavbar'
import AddStudent from './components/AddStudent'
import { StudentsBySubject } from './components/StudentsBySubject'
import { IStudentWithSubjects } from './utils/IStudents'
import { Assistance } from './components/Assistance'
import { OverviewStudents } from './components/OverviewStudents'
import { AssistancePass } from './components/AssistancePass'

function App() {

  const [allStudent, setAllStudent] = useState<IStudentWithSubjects[]>([]);
  useEffect(() => {
    axios.get('https://studify.azurewebsites.net/Grade')
      .then((reponse: AxiosResponse) => {
        setAllStudent(reponse.data);
      })
  }, [])

  return (
    <div className='container'>
      <TopNavbar />
      <NavigationHeader />
      <Routes>
        <Route path='/' element={<OverviewStudents data={allStudent} />} />
        <Route path='/spanish' element={<StudentsBySubject subjectId={1} />} />
        <Route path='/math' element={<StudentsBySubject subjectId={2} />} />
        <Route path='/social-sciences' element={<StudentsBySubject subjectId={3} />} />
        <Route path='/natural-sciences' element={<StudentsBySubject subjectId={4} />} />
        <Route path='/add-student' element={<AddStudent />} />
        <Route path='/assistance' element={<Assistance />} />
        <Route path='/assistance-pass' element={<AssistancePass />} />
      </Routes>
    </div>
  )
}

export default App
