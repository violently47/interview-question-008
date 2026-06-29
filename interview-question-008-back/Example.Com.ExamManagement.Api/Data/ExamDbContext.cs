using Example.Com.ExamManagement.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Example.Com.ExamManagement.Api.Data;

public class ExamDbContext(DbContextOptions<ExamDbContext> options) : DbContext(options)
{
    public DbSet<Exam> Exams => Set<Exam>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Exam>(entity =>
        {
            entity.ToTable("Exams");
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Number).IsUnique();
            entity.Property(e => e.Question).IsRequired().HasMaxLength(2000);
            entity.Property(e => e.OptionA).HasMaxLength(500);
            entity.Property(e => e.OptionB).HasMaxLength(500);
            entity.Property(e => e.OptionC).HasMaxLength(500);
            entity.Property(e => e.OptionD).HasMaxLength(500);
            entity.Property(e => e.CorrectAnswer).HasMaxLength(1);
        });
    }
}
