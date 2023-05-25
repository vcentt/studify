using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class StudifyContext : DbContext
{
    public StudifyContext()
    {
    }

    public StudifyContext(DbContextOptions<StudifyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Assistance> Assistances { get; set; }

    public virtual DbSet<Grade> Grades { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Subject> Subjects { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DbConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Assistance>(entity =>
        {
            entity.HasKey(e => e.AssistanceId).HasName("PK__Assistan__901E90B9BFFA1611");

            entity.ToTable("Assistance");

            entity.Property(e => e.AssistanceId).HasColumnName("AssistanceID");
            entity.Property(e => e.StudentId).HasColumnName("StudentID");

            // entity.HasOne(d => d.Student).WithMany(p => p.Assistances)
            //     .HasForeignKey(d => d.StudentId)
            //     .HasConstraintName("FK__Assistanc__IsPre__5CD6CB2B");
        });

        modelBuilder.Entity<Grade>(entity =>
        {
            entity.HasKey(e => e.GradeId).HasName("PK__Grades__54F87A373B94808D");

            entity.Property(e => e.GradeId).HasColumnName("GradeID");
            entity.Property(e => e.Grade1).HasColumnName("Grade");
            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

            // entity.HasOne(d => d.Student)
            //     .WithMany(p => p.Grades)
            //     .HasForeignKey(d => d.StudentId)
            //     .HasConstraintName("FK__Grades__StudentI__3B75D760");

            entity.HasOne(d => d.Subject).WithMany(p => p.Grades)
                .HasForeignKey(d => d.SubjectId)
                .HasConstraintName("FK__Grades__SubjectI__3C69FB99");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__Students__32C52A79E433337D");

            entity.Property(e => e.StudentId).HasColumnName("StudentID");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
        });

        modelBuilder.Entity<Subject>(entity =>
        {
            entity.HasKey(e => e.SubjectId).HasName("PK__Subjects__AC1BA3888C715EC3");

            entity.Property(e => e.SubjectId).HasColumnName("SubjectID");
            entity.Property(e => e.SubjectName).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
