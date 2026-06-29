namespace Example.Com.ExamManagement.Api.Dtos;

public class ExamResponse
{
    public int Id { get; set; }

    public int Number { get; set; }

    public required string Question { get; set; }

    public string? OptionA { get; set; }

    public string? OptionB { get; set; }

    public string? OptionC { get; set; }

    public string? OptionD { get; set; }

    public string? CorrectAnswer { get; set; }

    public DateTime CreatedAt { get; set; }
}
