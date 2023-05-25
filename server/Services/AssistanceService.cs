using Interfaces.IAssistanceRepository;
using Interfaces.IAssistanceService;
using server.Models;

namespace Services.AssistanceService;
public class AssistanceService : IAssistanceService {
    private readonly IAssistanceRepository _assistanceRepository;

    public AssistanceService(IAssistanceRepository assistanceRepository)
    {
        _assistanceRepository = assistanceRepository;
    }

    public async Task<IEnumerable<StudentAssistanceDTO>> GetAll(string date)
    {
        return await _assistanceRepository.GetAll(date);
    }

    public async Task<Assistance> Update(AssistanceDTO studentAssistance)
    {
        return await _assistanceRepository.Update(studentAssistance);
    }
}