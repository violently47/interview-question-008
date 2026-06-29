namespace Example.Com.ExamManagement.Api.Entities;

public class Exam
{
    public int Id { get; set; }

    /// <summary>ลำดับข้อสอบที่แสดงบนหน้าจอ (Running Number)</summary>
    public int Number { get; set; }

    public required string Question { get; set; }

    public string? OptionA { get; set; }

    public string? OptionB { get; set; }

    public string? OptionC { get; set; }

    public string? OptionD { get; set; }

    public string? CorrectAnswer { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
