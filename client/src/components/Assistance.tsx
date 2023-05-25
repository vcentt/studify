import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Button, Table } from "react-bootstrap"
import { IStudentAssistance } from "../utils/IStudents"
import { BsCheckSquareFill, BsCheckSquare, BsCheck, BsX } from "react-icons/bs";



export function Assistance() {
    const [allStudent, setAllStudent] = useState<IStudentAssistance[]>([])
    const [showTable, setShowTable] = useState(false);
    const [date, setDate] = useState('');

    const handleModifyAssitance = (studentId: number, date: string, isPresent: boolean) => {
        const userChangeAssistance = {
            studentId: studentId,
            assistanceDate: date,
            isPresent: isPresent
        }

        axios.put('http://localhost:5117/Assistance', userChangeAssistance)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleSubmit = () => {
        axios.get(`http://localhost:5117/Assistance?assistanceDate=${date}`)
            .then((response: AxiosResponse) => {
                setAllStudent(response.data)
                setShowTable(true);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <main>
            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            <Button variant="primary" onClick={handleSubmit}>Search</Button>
            {showTable && (
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Assistance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allStudent.map((student) => {
                                return (
                                    <tr key={student.studentId}>
                                        <td>{`${student.firstName} ${student.lastName}`}</td>
                                        <td>
                                            {student.isPresent === true ?
                                                <button
                                                    onClick={() => handleModifyAssitance(student.studentId, date, false)}
                                                    className="btn btn-success"><BsCheck size={20}/>
                                                </button>
                                                :
                                                <button
                                                    onClick={() => handleModifyAssitance(student.studentId, date, true)}
                                                    className="btn btn-danger"><BsX size={20}/>
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>)
            }
        </main>
    )
}