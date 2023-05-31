
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

export interface IStudentAssistance {
    studentId : number
    firstName: string,
    lastName : string,
    isPresent : boolean
}

export interface IStudentAssistancePass {
    studentId : number
    date: string,
    isPresent : boolean
}

export interface IStudentJustName {
    studentId : number
    firstName: string,
    lastName : string
}