using back_nobarriers.Models;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Report;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemReportsController : ControllerBase
    {
        private readonly ProblemReportDbContext _problemReportDbContext;
        private readonly UserManager<User> _userManager;
        private readonly TestDbContext _testDbContext;

        public ProblemReportsController(ProblemReportDbContext problemReportDbContext, UserManager<User> userManager, TestDbContext testDbContext)
        {
            _problemReportDbContext = problemReportDbContext;
            _userManager = userManager;
            _testDbContext = testDbContext;
        }

        [HttpPost("report")]
        public async Task<IActionResult> ReportProblem([FromBody] ProblemReport report)
        {
            if (report == null)
            {
                return BadRequest("Invalid problem report data");
            }

           _problemReportDbContext.ProblemReports.Add(report);
            await _problemReportDbContext.SaveChangesAsync();

            return Ok("Problem reported successfully");
        }
        [HttpGet("getAllReports/{userId}")]
        public async Task<IActionResult> GetAllReports(string userId)
        {
            var reports = await _problemReportDbContext.ProblemReports
                .Where(i => i.RecipientId == userId)
                .ToListAsync();

            var result = new List<object>();

            foreach (var report in reports)
            {
                var userName = await _userManager.Users
                    .Where(u => u.Id == report.UserId)
                    .Select(u => u.UserName)
                    .FirstOrDefaultAsync();

                result.Add(new
                {
                    report.Id,
                    report.UserId,
                    UserName = userName,
                    report.Description,
                    report.ReportDate,
                    report.RecipientId,
                    report.TestId
                });
            }

            return Ok(result);
        }
        [HttpGet("getReport/{reportId}")]
        public async Task<IActionResult> GetReport(int reportId)
        {
            var report = await _problemReportDbContext.ProblemReports.FirstAsync(i => i.Id == reportId);
            if(report == null)
            {
                return NotFound("Report not found");
            }
            var testName = await _testDbContext.Tests.Where(t=>t.Id == report.TestId).Select(n=>n.TestName).FirstOrDefaultAsync();
            var userName = await _userManager.Users.Where(u => u.Id == report.UserId).Select(u => u.UserName).FirstOrDefaultAsync();
            var extendedReportData = new
            {
                report.Id,
                report.UserId,
                UserName = userName,
                report.Description,
                report.ReportDate,
                report.RecipientId,
                report.TestId,
                TestName = testName
            };
            return Ok(extendedReportData);

        }


        [HttpGet("getAllReports")]
        public async Task<IActionResult> GetAllProblemReports()
        {
            var reports = await _problemReportDbContext.ProblemReports.ToListAsync();
            return Ok(reports);
        }

        [HttpGet("report/{id}")]
        public async Task<IActionResult> GetProblemReportById(int id)
        {
            var report = await _problemReportDbContext.ProblemReports.FindAsync(id);

            if (report == null)
            {
                return NotFound("Problem report not found");
            }

            return Ok(report);
        }
        [HttpPost("responseToReport")]
        public async Task<IActionResult> ResponseToReport([FromBody] AnswerToTheReport answerToTheReport)
        {
            var teacher = await _userManager.Users.FirstOrDefaultAsync(i=>i.Id == answerToTheReport.SenderId);
            var receiver = await _userManager.Users.FirstOrDefaultAsync(i => i.Id == answerToTheReport.ReceiverId);
            var report = await _problemReportDbContext.ProblemReports.FirstOrDefaultAsync(i => i.Id == answerToTheReport.ReportId);
            if (teacher == null || report == null || receiver == null)
            {
                return NotFound("Data Not Found");
            }

            _problemReportDbContext.AnswerToTheReports.Add(answerToTheReport);
            await _problemReportDbContext.SaveChangesAsync();
            return Ok("Answer added successfully");
            
        }
        [HttpGet("getAllAnswers/{userId}")]
        public async Task<IActionResult> GetAllAnswers(string userId)
        {
            var answers = await _problemReportDbContext.AnswerToTheReports.Where(i=>i.ReceiverId == userId).ToListAsync();
            var result = new List<object>();
            foreach(var answer in answers)
            {
                var teacherName = await _userManager.Users.Where(u=>u.Id == answer.SenderId).FirstOrDefaultAsync();
                result.Add(new
                {
                    answer.Id,
                    answer.SenderId,
                    TeacherName = teacherName.UserName,
                    answer.ReceiverId,
                    answer.AnswerDate,
                    answer.AnswerText

                });
            }
            return Ok(result);
        }

        [HttpPut("resolve/{id}")]
        public async Task<IActionResult> ResolveProblemReport(int id)
        {
            var report = await _problemReportDbContext.ProblemReports.FindAsync(id);

            if (report == null)
            {
                return NotFound("Problem report not found");
            }

            await _problemReportDbContext.SaveChangesAsync();

            return Ok("Problem report resolved successfully");
        }
        [HttpDelete("deleteReport/{id}")]
        public async Task<IActionResult> DeleteProblemReport(int id)
        {
            var report = await _problemReportDbContext.ProblemReports.FindAsync(id);
            if(report == null)
            {
                return NotFound("Problem report not found");
            }
            _problemReportDbContext.ProblemReports.Remove(report);
            await _problemReportDbContext.SaveChangesAsync();
            return Ok("Problem report deleted successfully");
        }
    }
}
