using Interfaces.IStudentService;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;

    private readonly ILogger<StudentController> _logger;

    public StudentController(ILogger<StudentController> logger,IStudentService studentService)
    {
        _logger = logger;
        _studentService = studentService;
    }

    [HttpGet]
    public async Task<IEnumerable<Student>> Get()
    {
        try{
            return await _studentService.GetAll();
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<Student?> GetbyId(long id)
    {
        try{
            return await _studentService.GetById(id);
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }
    [HttpPost]
    public async Task<Student?> Create([FromBody] StudentDTO newStudent){
        try{
            return await _studentService.Add(newStudent);
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<Student?> Put(long id, [FromBody] StudentDTO updateStudent){
        try{
            return await _studentService.Update(id, updateStudent);
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<Student?> Delete(long id){
        try{
            return await _studentService.Delete(id);
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }
}
