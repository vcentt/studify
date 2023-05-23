
using server.Models;

namespace Interfaces.IGradeRepository;

public interface IGradeRepository {
    Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllRecords();
    Task<IEnumerable<StudentDTOwithGradeDTO>> GetAllBySubjectId(long id);
    Task<Grade> Update(GradeDTO grade);
}