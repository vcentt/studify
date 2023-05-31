import { useEffect, useState } from "react"
import axios from "axios"
import { Button, Table } from "react-bootstrap"
import { IStudentAssistancePass, IStudentJustName } from "../utils/IStudents"



export function AssistancePass() {
    const [allStudent, setAllStudent] = useState<IStudentJustName[]>([])
    const [assistanceData, setAssistanceData] = useState<IStudentAssistancePass[]>([])
    const [AssistanceToSend, setAssistanceToSend] = useState<string[]>([])
    const [date, setDate] = useState('');

    
    const fetchStudents = async (): Promise<void> => {
        try {
            const response = await axios.get<IStudentJustName[]>('https://studify.azurewebsites.net/Student');
            const initialAttendanceData = response.data.map((student) => ({
                studentId: student.studentId,
                date: '',
                isPresent: false,
            }));
            setAllStudent(response.data);
            setAssistanceData(initialAttendanceData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
      }, []);
    
    const handleAssistanceChange = (studentId:number , isPresent:boolean) => {
        const updatedAssistanceData = assistanceData.map((data) => {
            if(data.studentId == studentId){
                return {...data, date, isPresent}
            }
            return data;
        });
        setAssistanceData(updatedAssistanceData);
    }


    const handleToSubmitAssistance = () => {

        const allAssistance = assistanceData.map((student) =>{
            return student.date = date
        });
        setAssistanceToSend(allAssistance);

        axios.post('https://studify.azurewebsites.net/Assistance', AssistanceToSend)
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
            <Button variant="primary" onClick={handleToSubmitAssistance}>Send</Button>
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