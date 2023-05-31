using server.Models;

namespace Interfaces.IAssistanceRepository;

public interface IAssistanceRepository {
    Task<IEnumerable<StudentAssistanceDTO>> GetAll(string date);
    Task<Assistance> Update(AssistanceDTO studentAssistance);
    Task<Assistance[]> Add(Assistance[] assistances);
}