
using server.Models;

namespace Interfaces.IStudentService;

public interface IStudentService {
    Task<IEnumerable<Student>> GetAll();
    Task<Student> GetById(long id);
    Task<Student> Add(StudentDTO student);
    Task<Student> Update(long id, StudentDTO student);
    Task<Student> Delete(long id);
}