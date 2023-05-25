public class StudentAssistanceDTO
{
    public int StudentId { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool? IsPresent { get; set; }
}


public class AssistanceDTO
{
    public int StudentId { get; set; }
    public string? AssistanceDate { get; set; }
    public bool? IsPresent { get; set; }
}