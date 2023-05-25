using server.Models;

namespace Interfaces.IAssistanceService;

public interface IAssistanceService {
    Task<IEnumerable<StudentAssistanceDTO>> GetAll(string date);
    Task<Assistance> Update(AssistanceDTO studentAssistance);
}