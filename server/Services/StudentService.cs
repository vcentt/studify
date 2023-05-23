

using Interface.IStudentRepository;
using Interfaces.IStudentService;
using server.Models;

namespace Services.StudentService;

public class StudentService : IStudentService {
    private readonly IStudentRepository _studentRepository;

    public StudentService(IStudentRepository studentRepository){
        _studentRepository = studentRepository;
    }

    public async Task<IEnumerable<Student>> GetAll()
    {
        return await _studentRepository.GetAll();
    }

    public async Task<Student> GetById(long id)
    {
        return await _studentRepository.GetById(id);
    }
    public async Task<Student> Add(StudentDTO student)
    {
        return await _studentRepository.Add(student);
    }

    public async Task<Student> Update(long id, StudentDTO student)
    {
        return await _studentRepository.Update(id, student);
    }
    public async Task<Student> Delete(long id)
    {
        return await _studentRepository.Delete(id);
    }
}