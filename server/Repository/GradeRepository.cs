using Interfaces.IGradeRepository;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace Repository.GradeRepository;


public class GradeRepository : IGradeRepository
{

    private readonly StudifyContext _context;

    public GradeRepository(StudifyContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllRecords()
    {
        var result = await (
           from s in _context.Students
           join g in _context.Grades on s.StudentId equals g.StudentId
           join su in _context.Subjects on g.SubjectId equals su.SubjectId
           select new StudentDTOwithGradeDTO
           {
               StudentId = s.StudentId,
               FirstName = s.FirstName,
               LastName = s.LastName,
               SubjectName = su.SubjectName,
               Grade = g.Grade1
           }
       ).GroupBy(x => new { x.StudentId, x.FirstName, x.LastName })
        .Select(g => new StudentDTOwithGradeDTO
        {
            StudentId = g.Key.StudentId,
            FirstName = g.Key.FirstName,
            LastName = g.Key.LastName,
            SpanishLanguage = g.FirstOrDefault(x => x.SubjectName == "Spanish Language")!.Grade,
            Mathematics = g.FirstOrDefault(x => x.SubjectName == "Mathematics")!.Grade,
            SocialSciences = g.FirstOrDefault(x => x.SubjectName == "Social Sciences")!.Grade,
            NaturalSciences = g.FirstOrDefault(x => x.SubjectName == "Natural Sciences")!.Grade
        }).ToListAsync();

        return result;
    }
    public async Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllBySubjectId(long id)
    {
        var query = from n in _context.Grades
                    join a in _context.Subjects on n.SubjectId equals a.SubjectId
                    join b in _context.Students on n.StudentId equals b.StudentId
                    where n.SubjectId == id
                    select new StudentDTOwithGradeDTO
                    {
                        StudentId = b.StudentId,
                        FirstName = b.FirstName,
                        LastName = b.LastName,
                        SubjectName = a.SubjectName,
                        Grade = n.Grade1
                    };

        return await query.ToListAsync();
    }

    public async Task<Grade> Update(GradeDTO grade)
    {
        var query = from n in _context.Grades
                    where n.SubjectId == grade.SubjectId &&
                    n.StudentId == grade.StudentId
                    select n;


        var student = await query.FirstAsync();

        var studentToUpdateGrade = new Grade
        {
            Grade1 = grade.Grade
        };

        student.Grade1 = grade.Grade;
        await _context.SaveChangesAsync();
        return studentToUpdateGrade;
    }
}