export function calculateGradeAverage (grade: string): string {
    if(grade >= "90"){
        return "A"
    }
    if(grade >= "80" && grade <= "89"){
        return "B"
    }
    if(grade >= "70" && grade <= "79"){
        return "C"
    }else{
        return "F"
    }
}

export function calculateGradeAverageNum (grade: number): string {
    if(grade >= 90){
        return "A"
    }
    if(grade >= 80 && grade <= 89){
        return "B"
    }
    if(grade >= 70 && grade <= 79){
        return "C"
    }else{
        return "F"
    }
}