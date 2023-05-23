using Interface.IStudentRepository;
using Interfaces.IGradeRepository;
using Interfaces.IGradeService;
using Interfaces.IStudentService;
using Microsoft.EntityFrameworkCore;
using Repository.GradeRepository;
using Repository.StudentRepository;
using server.Models;
using Services.GradeServices;
using Services.StudentService;

var builder = WebApplication.CreateBuilder(args);

var provider = builder.Services.BuildServiceProvider();
var settings = provider.GetRequiredService<IConfiguration>();
builder.Services.AddCors(op => {
    var clientURL = settings.GetValue<string>("ConnectionStrings:ClientConnection");

    op.AddDefaultPolicy(builder => {
        builder.WithOrigins(clientURL!).AllowAnyMethod().AllowAnyHeader();
    });
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Connection with my DB
builder.Services.AddDbContext<StudifyContext>(op => op.UseSqlServer("name:ConnectionStrings:DbConnection"));

builder.Services.AddScoped<IStudentRepository , StudentRepository>();
builder.Services.AddScoped<IGradeRepository , GradeRepository>();
builder.Services.AddScoped<IStudentService , StudentService>();
builder.Services.AddScoped<IGradeService , GradeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();
