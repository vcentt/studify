using Interfaces.IGradeRepository;
using Interfaces.IGradeService;
using server.Models;

namespace Services.GradeServices;

public class GradeService : IGradeService
{
    private readonly IGradeRepository _gradeRepository;

    public GradeService(IGradeRepository gradeRepository){
        _gradeRepository = gradeRepository;
    }

    public async Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllRecords()
    {
        return await _gradeRepository.GetAllRecords();
    }
    public async Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllBySubjectId(long id)
    {
        return await _gradeRepository.GetAllBySubjectId(id);
    }
    public async Task<Grade> Update(GradeDTO grade)
    {
        return await _gradeRepository.Update(grade);
    }
}