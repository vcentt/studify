using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    // public virtual ICollection<Assistance> Assistances { get; set; } = new List<Assistance>();

    // public virtual ICollection<Grade> Grades { get; set; } = new List<Grade>();
}
