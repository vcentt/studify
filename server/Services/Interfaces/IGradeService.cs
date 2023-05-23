using server.Models;

namespace Interfaces.IGradeService;

public interface IGradeService {
    Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllRecords();
    Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllBySubjectId(long id);
    Task<Grade> Update(GradeDTO grade);
}