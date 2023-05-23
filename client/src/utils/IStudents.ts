
export interface IStudent {
    studentId: number;
    firstName: string;
    lastName: string;
    subjectName: string;
    grade: string;
}

export interface IStudentWithSubjects {
    studentId: number;
    firstName: string;
    lastName: string;
    subjectName: string;
    grade: string;
    spanishLanguage : number;
    mathematics : number;
    socialSciences : number;
    naturalSciences : number;
}