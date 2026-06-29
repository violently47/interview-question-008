using Example.Com.ExamManagement.Api.Dtos;
using Example.Com.ExamManagement.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Example.Com.ExamManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExamsController(IExamService examService) : ControllerBase
{
    /// <summary>IT 08-1 — แสดงรายการข้อสอบทั้งหมด</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<ExamResponse>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<ExamResponse>>> GetAll(CancellationToken cancellationToken)
    {
        var exams = await examService.GetAllAsync(cancellationToken);
        return Ok(exams);
    }

    /// <summary>ดึงข้อมูลข้อสอบรายการเดียว</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ExamResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ExamResponse>> GetById(int id, CancellationToken cancellationToken)
    {
        var exam = await examService.GetByIdAsync(id, cancellationToken);
        if (exam is null)
        {
            return NotFound();
        }

        return Ok(exam);
    }

    /// <summary>IT 08-2 — บันทึกข้อสอบใหม่</summary>
    [HttpPost]
    [ProducesResponseType(typeof(ExamResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ExamResponse>> Create(
        [FromBody] CreateExamRequest request,
        CancellationToken cancellationToken)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        var exam = await examService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = exam.Id }, exam);
    }

    /// <summary>IT 08-1 — ลบข้อสอบและจัด Running Number ใหม่</summary>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        var deleted = await examService.DeleteAsync(id, cancellationToken);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
