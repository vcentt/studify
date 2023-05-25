using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Interfaces.IAssistanceRepository;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace Repository.AssistanceRepository;
public class AssistanceRepository : IAssistanceRepository {
    private readonly StudifyContext _context;

    public AssistanceRepository(StudifyContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<StudentAssistanceDTO>> GetAll(string date) {

        return await _context.Assistances
        .Where(a => a.AssistanceDate == DateOnly.Parse(date))
        .Join(_context.Students,
            a => a.StudentId,
            s => s.StudentId,
            (a, s) => new StudentAssistanceDTO
            {
                StudentId = s.StudentId,
                FirstName = s.FirstName,
                LastName = s.LastName,
                IsPresent = a.IsPresent
            })
        .ToListAsync();
    }

    public async Task<Assistance> Update(AssistanceDTO studentAssistance) {

        var query = from n in _context.Assistances
                    where n.StudentId == studentAssistance.StudentId &&
                        n.AssistanceDate == DateOnly.Parse(studentAssistance.AssistanceDate!)
                    select n;


        var student = await query.FirstAsync();

        var updateAssistance = new Assistance {
            StudentId = studentAssistance.StudentId,
            AssistanceDate = DateOnly.Parse(studentAssistance.AssistanceDate!),
            IsPresent = studentAssistance.IsPresent

        };

        student.IsPresent = studentAssistance.IsPresent;
        await _context.SaveChangesAsync();
        return updateAssistance;
    }
}