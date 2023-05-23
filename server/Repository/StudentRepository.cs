using Interface.IStudentRepository;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace Repository.StudentRepository;


public class StudentRepository : IStudentRepository {

    private readonly StudifyContext _context;

    public StudentRepository(StudifyContext context){
        _context = context;
    }
    public async Task<IEnumerable<Student>> GetAll()
    {
        var query = from n in _context.Students
                    select n;

        return await query.ToListAsync();
    }

    public async Task<Student> GetById(long id)
    {
        var query = from n in _context.Students
                    where n.StudentId == id
                    select n;

        return await query.FirstAsync();
    }

    public async Task<Student> Add(StudentDTO student)
    {
        var studentDTO = new Student
        {
            FirstName = student.FirstName,
            LastName = student.LastName,
        };
        _context.Students.Add(studentDTO);
        await _context.SaveChangesAsync();

        List<Subject> allSubjects = _context.Subjects.ToList();
        foreach (Subject allSubject in allSubjects)
        {
            var gradesDTO = new Grade
            {
                StudentId = studentDTO.StudentId,
                SubjectId = allSubject.SubjectId,
                Grade1 = 0
            };
            await _context.Grades.AddAsync(gradesDTO);
        }
        await _context.SaveChangesAsync();
        return studentDTO;
    }

    public async Task<Student> Update(long id, StudentDTO student)
    {
        var searchStudent = await GetById(id);

        var studentDTO = new Student {
            FirstName = student.FirstName,
            LastName = student.LastName
        };

        searchStudent.FirstName = studentDTO.FirstName;
        searchStudent.LastName = studentDTO.LastName;

        await _context.SaveChangesAsync();
        return studentDTO;
    }
    public async Task<Student> Delete(long id)
    {
        var queryAllRecordsWithSameId = from n in _context.Grades
                     where n.StudentId == id
                     select n;
        _context.Grades.RemoveRange(queryAllRecordsWithSameId);
        await _context.SaveChangesAsync();
        
        var query = await GetById(id);
        var studentDelete = new Student {
            StudentId = query.StudentId,
            FirstName = query.FirstName,
            LastName = query.LastName
        };

        _context.Students.Remove(query);
        await _context.SaveChangesAsync();


        return studentDelete;
    }
}