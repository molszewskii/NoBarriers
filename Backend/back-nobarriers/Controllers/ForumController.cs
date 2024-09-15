using back_nobarriers.Models;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Forum;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ForumDbContext _forumDbContext;

        public ForumController(UserManager<User> userManager, ForumDbContext forumDbContext)
        {
            _userManager = userManager;
            _forumDbContext = forumDbContext;
        }

        [HttpPost]
        [Route("addQuestion")]
        public async Task<IActionResult> AddQuestion( [FromBody] ForumQuestion forumQuestion)
        {
            var user = await _userManager.FindByIdAsync(forumQuestion.AuthorId);
            if (user == null)
            {
                return NotFound("User not found!");
            }
            var fQuestion = new ForumQuestion
            {
                Title = forumQuestion.Title,
                Description = forumQuestion.Description,
                AuthorId = forumQuestion.AuthorId,
                AuthorName = user.UserName,
                Timestamp = DateTime.UtcNow,
            };
            _forumDbContext.ForumQuestions.Add(fQuestion);
            await _forumDbContext.SaveChangesAsync();
            return Ok(fQuestion);
        }
        [HttpPut]
        [Route("editQuestion/{questionId}")]
        public async Task<IActionResult> EditQuestion(int questionId, [FromBody] ForumQuestion updatedQuestion)
        {
            var existingQuestion = await _forumDbContext.ForumQuestions.FindAsync(questionId);
            if (existingQuestion == null)
            {
                return NotFound("Question not found");
            }

            existingQuestion.Title = updatedQuestion.Title;
            existingQuestion.Description = updatedQuestion.Description;
            existingQuestion.Timestamp = DateTime.UtcNow;
            _forumDbContext.ForumQuestions.Update(existingQuestion);
            await _forumDbContext.SaveChangesAsync();
            return Ok(existingQuestion);
        }
        [HttpDelete]
        [Route("deleteQuestion/{questionId}")]
        public async Task<IActionResult> DeleteQuestion(int questionId)
        {
            var questionToDelete = await _forumDbContext.ForumQuestions.FindAsync(questionId);
            if (questionToDelete == null)
            {
                return NotFound("Question not found");
            }
            _forumDbContext.ForumQuestions.Remove(questionToDelete);
            await _forumDbContext.SaveChangesAsync();
            return Ok("Deleted: " + questionToDelete);
        }

        [HttpPost]
        [Route("addComment")]
        public async Task<IActionResult> AddComment([FromBody] Comment comment)
        {
            var user = await _userManager.FindByIdAsync (comment.AuthorId);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var com = new Comment
            {
                Descritpion = comment.Descritpion,
                AuthorId = comment.AuthorId,
                AuthorName = user.UserName,
                ForumQuestionId = comment.ForumQuestionId,
                Timestamp = DateTime.UtcNow,
            };
            _forumDbContext.Comments.Add(com);
            await _forumDbContext.SaveChangesAsync();
            return Ok(com);
        }
        [HttpPatch]
        [Route("editComment/{commentId}")]
        public async Task<IActionResult> EditComment(int commentId, [FromBody] Comment updatedComment)
        {
            var existingComment = await _forumDbContext.Comments.FindAsync(commentId);
            if(existingComment == null)
            {
                return NotFound("Comment not found");
            }
            existingComment.Descritpion = updatedComment.Descritpion;
            existingComment.Timestamp = DateTime.UtcNow;
            _forumDbContext.Comments.Update(existingComment);
            await _forumDbContext.SaveChangesAsync();
            return Ok(existingComment);
        }
        [HttpDelete]
        [Route("deleteComment/{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var commentToDelete = await _forumDbContext.Comments.FindAsync(commentId);
            if(commentToDelete == null)
            {
                return NotFound("Comment not found");
            }
            _forumDbContext.Comments.Remove(commentToDelete);
            await _forumDbContext.SaveChangesAsync();
            return Ok("Deleted: " + commentToDelete);
        }
        [HttpGet]
        [Route("getAllPosts")]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _forumDbContext.ForumQuestions
                .Include(q => q.CommentsList) 
                .ToListAsync();

            return Ok(posts);
        }

    }
}
