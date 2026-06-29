using Example.Com.ExamManagement.Api.Dtos;

namespace Example.Com.ExamManagement.Api.Services;

public interface IExamService
{
    Task<IReadOnlyList<ExamResponse>> GetAllAsync(CancellationToken cancellationToken = default);

    Task<ExamResponse?> GetByIdAsync(int id, CancellationToken cancellationToken = default);

    Task<ExamResponse> CreateAsync(CreateExamRequest request, CancellationToken cancellationToken = default);

    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
