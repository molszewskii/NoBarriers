using back_nobarriers.Models;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Tests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Claims;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TestDbContext _testDbContext;
        private readonly ITestDbContext _itestDbContext;
        private readonly CategoryDbContext _categoryDbContext;
        private readonly FlashCardDbContext _flashCardDbContext;
        private readonly ICategoryDbContext _icategoryDbContext;
        private readonly IFlashCardDbContext _iflashCardDbContext;

      /*  public TestController(UserManager<User> userManager, ITestDbContext testDbContext, ICategoryDbContext categoryDbContext, IFlashCardDbContext flashCardDbContext)
        {
            _userManager = userManager;
            _itestDbContext = testDbContext;
            _icategoryDbContext = categoryDbContext;
            _iflashCardDbContext = flashCardDbContext;
        }*/
        public TestController(UserManager<User> userManager, TestDbContext testDbContext, CategoryDbContext categoryDbContext, FlashCardDbContext flashCardDbContext)
        {
            _userManager = userManager;
            _testDbContext = testDbContext;
            _categoryDbContext = categoryDbContext;
            _flashCardDbContext = flashCardDbContext;
        }
        [HttpPost]
        [Route("addTest")]
        [Authorize(Roles ="TEACHER")]
        public async Task<ActionResult<Test>> PostTest(Test test)
        {

                string userId = test.UserId;

                test.UserId = userId;

                _testDbContext.Tests.Add(test);

                foreach (var question in test.Questions)
                {
                    question.TestId = test.Id;

                    _testDbContext.Questions.Add(question);

                    foreach (var option in question.Options)
                    {
                        option.QuestionId = question.Id;

                        _testDbContext.Options.Add(option);
                        
                    }
                }
                await _testDbContext.SaveChangesAsync();

                return Ok("Test has been created successfully");
            

        }

        [HttpGet]
        [Route("getTests/{id}")]
        public async Task<IActionResult> getTests(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound("Nie znaleziono usera o takim id");
            }

            var tests = _testDbContext.Tests
               .Where(u => u.UserId == id)
               .Select(test => new
               {
                   test.Id,
                   test.UserId,
                   test.TestName,
                   QuestionCount = test.Questions.Count,
                   Author= user.UserName
               })
               .ToList();


            return Ok(tests);
        }
        [HttpGet]
        [Route("getTestDetails/{id}")]
        public async Task<IActionResult> getTestDetails(int id)
        {
            var test = await _testDbContext.Tests.FirstOrDefaultAsync(i=>i.Id == id);
            if(test == null)
            {
                return NotFound("Nie znaleziono testu");
            }
            var teacher = await _userManager.Users.FirstOrDefaultAsync(i => i.Id == test.UserId);
            var questions = _testDbContext.Tests.Where(test => test.Id == id)
            .SelectMany(test => test.Questions, (test, question) => new
            {
                Teacher = teacher.UserName,
                TeacherId = teacher.Id,
                QuestionText = question.QuestionText,
                Options = question.Options.ToList()
            })
            .ToList();
            return Ok(questions);
        }
        [HttpGet]
        [Route("getAllTests")]
        public async Task<IActionResult> GetAllTests()
        {
            var tests = await _testDbContext.Tests.ToListAsync();
            if (tests.Count == 0)
            {
                return NotFound("Nie znaleziono żadnego testu");
            }

            var modifiedTests = new List<object>();

            foreach (var test in tests)
            {
                var user = await _userManager.FindByIdAsync(test.UserId);
               
                var categoryName = await _categoryDbContext.Categories.Where(c => c.Id == test.CategoryId).Select(n => n.Name).FirstOrDefaultAsync();
                var flashCards = await _flashCardDbContext.FlashCardBoxes.Where(f => f.Id == test.FlashCardBoxId).Select(f => f.Cards).ToListAsync();
                var questions = await _testDbContext.Questions.Where(t => t.TestId == test.Id).ToListAsync();
                if (user != null)
                {
                    modifiedTests.Add(new
                    {
                        test.Id,
                        test.UserId,
                        test.TestName,
                        QuestionCount = questions.Count,
                        Author = user.UserName + " " + user.Surname,
                        CategoryName = categoryName,
                        FlashCards = flashCards,
                        test.FlashCardBoxId
                    });
                }
            }

            return Ok(modifiedTests);
        }

        [HttpPost]
        [Route("submitTest")]
        public async Task<ActionResult<TestResult>> SubmitTest(TestResult testResult)
        {
            try
            {
                _testDbContext.TestResults.Add(testResult);
                await _testDbContext.SaveChangesAsync();
                return Ok("Zapisano wynik testu");
            }
            catch (Exception ex)
            {
                var response = new Response
                {
                    Status = "Error",
                    Message = ex.Message
                };
                if (ex.InnerException != null)
                {
                    response.Message += " InnerException: " + ex.InnerException.Message;
                }

                return BadRequest(response);
            
        }
        }

        [HttpGet]
        [Route("getTestResult/{teacherId}")]
        public async Task<IActionResult> getTestResult(string teacherId)
        {
            try
            {
                var testResults = await _testDbContext.TestResults.Include(ua=>ua.UserAnswers).Include(ca=>ca.CorrectAnswers).ToListAsync();
                var teacher = await _userManager.FindByIdAsync(teacherId);
                if (teacher == null)
                {
                    return NotFound("Nie znaleziono nauczyciela");
                }
                var results = new List<object>();
                foreach (var testResult in testResults)
                {
                    var result = await _testDbContext.Tests.Where(t => t.Id == testResult.TestId && string.Equals(t.UserId, teacher.Id)).Include(t=>t.Questions.Where(t=>t.TestId == testResult.TestId)).FirstOrDefaultAsync();
                    if (result != null)
                    {
                        var student = await _userManager.FindByIdAsync(testResult.UserId);
                        if (student == null)
                        {
                            return NotFound("Nie znaleziono takiego użytkownika");
                        }
                        var extendedResult = new
                        {
                            TestName = result.TestName,
                            UserName = student.UserName,
                            Questions = result.Questions,
                            TestResult = testResult
                        };
                        results.Add(extendedResult);
                    }

                }
                return Ok(results);
            }catch(Exception ex)
            {
                var response = new Response
                {
                    Status = "Error",
                    Message = ex.Message
                };
                return BadRequest(response);
            }
        }


    }
}
