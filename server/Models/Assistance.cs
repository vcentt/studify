using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Assistance
{
    public int AssistanceId { get; set; }

    public int? StudentId { get; set; }

    public DateOnly? AssistanceDate { get; set; }

    public bool? IsPresent { get; set; }

    // public virtual Student? Student { get; set; }
}
