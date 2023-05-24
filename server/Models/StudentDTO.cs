public class StudentDTO {

    public string? FirstName { get; set;}
    public string? LastName { get; set;}
}

public class StudentDTOwithGradeDTO {
    public int StudentId { get; set; }
    public string? FirstName { get; set;}
    public string? LastName { get; set;}
    public string? SubjectName { get; set; }
    public int? Grade { get; set; }
    public int? SpanishLanguage {get; set;}
    public int? Mathematics { get; set; }
    public int? SocialSciences { get; set; }
    public int? NaturalSciences { get; set; }
}