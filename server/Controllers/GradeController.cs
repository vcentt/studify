using Interfaces.IGradeService;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class GradeController : ControllerBase
{
    private readonly IGradeService _gradeService;

    private readonly ILogger<GradeController> _logger;

    public GradeController(ILogger<GradeController> logger,IGradeService gradeService)
    {
        _logger = logger;
        _gradeService = gradeService;
    }

    [HttpGet]
    public async Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllRecords()
    {
        try{
            return await _gradeService.GetAllRecords();
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllBySubjectId(long id)
    {
        try{
            return await _gradeService.GetAllBySubjectId(id);
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }

    [HttpPut]
    public async Task<Grade?> Put([FromBody] GradeDTO updateGrade){
        try{
            return await _gradeService.Update(updateGrade);
        }catch(Exception e){
            throw new Exception(e.ToString());
        }
    }
}
