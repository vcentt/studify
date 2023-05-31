import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Table } from "react-bootstrap"
import { IStudentAssistancePass, IStudentJustName } from "../utils/IStudents"



export function AssistancePass() {
    const [allStudent, setAllStudent] = useState<IStudentJustName[]>([])
    const [assistanceData, setAssistanceData] = useState<IStudentAssistancePass[]>([])
    const [date, setDate] = useState('');

    useEffect(() => {
        fetchStudents();
      }, []);

    const fetchStudents = async (): Promise<void> => {
        try {
          const response = await axios.get<IStudentJustName[]>("/students");
          const initialAttendanceData = response.data.map((student) => ({
            studentId: student.studentId,
            date: date,
            isPresent: false,
          }));
          setAllStudent(response.data);
          setAssistanceData(initialAttendanceData);
        } catch (error) {
          console.error(error);
        }
      };

    const handleAssistanceChange = (studentId:number , isPresent:boolean) => {
        const updatedAssistanceData = assistanceData.map((data) => {
            if(data.studentId == studentId){
                return {...data, isPresent}
            }
            return data;
        });
        setAssistanceData(updatedAssistanceData);
    }


    const handleToSubmitAssistance = () => {
        axios.post('https://studify.azurewebsites.net/Assistance', assistanceData)
            .then(response => {
                console.log(response.data);
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
            <Button variant="primary" onClick={handleToSubmitAssistance}>Search</Button>
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
                                        <input
                                            type="checkbox"
                                            checked={assistanceData.some((data) => data.studentId === student.studentId)}
                                            onChange={(e) => handleAssistanceChange(student.studentId, e.target.checked)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </main>
    )
}