using Example.Com.ExamManagement.Api.Data;
using Example.Com.ExamManagement.Api.Dtos;
using Example.Com.ExamManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Example.Com.ExamManagement.Api.Services;

public class ExamService(ExamDbContext dbContext) : IExamService
{
    public async Task<IReadOnlyList<ExamResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var exams = await dbContext.Exams
            .AsNoTracking()
            .OrderBy(e => e.Number)
            .ToListAsync(cancellationToken);

        return exams.Select(MapToResponse).ToList();
    }

    public async Task<ExamResponse?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var exam = await dbContext.Exams
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == id, cancellationToken);

        return exam is null ? null : MapToResponse(exam);
    }

    public async Task<ExamResponse> CreateAsync(CreateExamRequest request, CancellationToken cancellationToken = default)
    {
        var nextNumber = await dbContext.Exams.AnyAsync(cancellationToken)
            ? await dbContext.Exams.MaxAsync(e => e.Number, cancellationToken) + 1
            : 1;

        var exam = new Exam
        {
            Number = nextNumber,
            Question = request.Question,
            OptionA = request.OptionA,
            OptionB = request.OptionB,
            OptionC = request.OptionC,
            OptionD = request.OptionD,
            CorrectAnswer = request.CorrectAnswer
        };

        dbContext.Exams.Add(exam);
        await dbContext.SaveChangesAsync(cancellationToken);

        return MapToResponse(exam);
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var exam = await dbContext.Exams.FirstOrDefaultAsync(e => e.Id == id, cancellationToken);
        if (exam is null)
        {
            return false;
        }

        var deletedNumber = exam.Number;
        dbContext.Exams.Remove(exam);

        var examsToRenumber = await dbContext.Exams
            .Where(e => e.Number > deletedNumber)
            .OrderBy(e => e.Number)
            .ToListAsync(cancellationToken);

        foreach (var item in examsToRenumber)
        {
            item.Number--;
        }

        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static ExamResponse MapToResponse(Exam exam) => new()
    {
        Id = exam.Id,
        Number = exam.Number,
        Question = exam.Question,
        OptionA = exam.OptionA,
        OptionB = exam.OptionB,
        OptionC = exam.OptionC,
        OptionD = exam.OptionD,
        CorrectAnswer = exam.CorrectAnswer,
        CreatedAt = exam.CreatedAt
    };
}
