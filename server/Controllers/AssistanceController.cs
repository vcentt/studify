using Interfaces.IAssistanceService;
using Interfaces.IGradeService;
using Microsoft.AspNetCore.Mvc;
using server.Models;

[ApiController]
[Route("[controller]")]
public class AssistanceController : ControllerBase
{
    private readonly IAssistanceService _assistanceService;
    private readonly ILogger<AssistanceController> _logger;

    public AssistanceController(IAssistanceService assistanceService, ILogger<AssistanceController> logger)
    {
        _assistanceService = assistanceService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<StudentAssistanceDTO>>> GetAssistancesByDate(string assistanceDate)
    {
        try
        {
            var assistances = await _assistanceService.GetAll(assistanceDate);
            return Ok(assistances);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }

    [HttpPut]
    public async Task<ActionResult<Assistance>> UpdateAssistance([FromBody] AssistanceDTO studentAssistance)
    {
        try
        {
            await _assistanceService.Update(studentAssistance);
            return Ok();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }

    [HttpPost]
    public async Task<ActionResult<Assistance[]>> Add([FromBody] Assistance[] assistances)
    {
        try
        {
            await _assistanceService.Add(assistances);
            return Ok();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
    }
}
