using System.ComponentModel.DataAnnotations;

namespace Example.Com.ExamManagement.Api.Dtos;

public class CreateExamRequest
{
    [Required(ErrorMessage = "กรุณากรอกคำถาม")]
    [MaxLength(2000)]
    public required string Question { get; set; }

    [MaxLength(500)]
    public string? OptionA { get; set; }

    [MaxLength(500)]
    public string? OptionB { get; set; }

    [MaxLength(500)]
    public string? OptionC { get; set; }

    [MaxLength(500)]
    public string? OptionD { get; set; }

    [MaxLength(1)]
    public string? CorrectAnswer { get; set; }
}
