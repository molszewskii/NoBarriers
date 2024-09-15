using back_nobarriers.Models;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;
        private readonly UserManager<User> _userManager;
        public UserController(UserDbContext userDbContext, UserManager<User> userManager)
        {
            _userDbContext = userDbContext;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userDbContext.Users.ToListAsync();
        }
      /*  [HttpGet("GetUser/{id}")]
        public async Task<IActionResult> getUserFromId()
        {

        }*/


        /*[HttpGet]
        [Route("GetUser/{email}/{password}")]
        public async Task<User> GetUser(string email, string password)
        {
            var user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.email == email && u.password == password);
            return user;
        }*/

        [HttpPost]
        [Route("AddUser")]
        public async Task<User> AddUser(User user)
        {
            _userDbContext.Users.Add(user);
            await _userDbContext.SaveChangesAsync();
            return user;
        }

      /*  [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task<User> UpdateUser(User user)
        {
            _userDbContext.Entry(user).State = EntityState.Modified;
            await _userDbContext.SaveChangesAsync();
            return user;
        }*/
        [HttpPatch]
        [Route("UpdateUser/{id}")]
        public async Task<ActionResult<User>> UpdateUser(string id, [FromBody] User updatedUser)
        {
            var existingUser = await _userDbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (existingUser == null)
            {
                return NotFound(new Response { Status = "Error", Message = "Użytkownik nie został znaleziony." });
            }

            if (updatedUser.UserName != null)
            {
                existingUser.UserName = updatedUser.UserName;
            }

            if (updatedUser.Email != null)
            {
                existingUser.Email = updatedUser.Email;
            }
            await _userDbContext.SaveChangesAsync();

            return existingUser;
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public bool DeleteUser(int id)
        {
            bool a = false;
            var user = _userDbContext.Users.Find(id);
            if (user != null)
            {
                a = true;
                _userDbContext.Entry(user).State = EntityState.Deleted;
                _userDbContext.SaveChanges();

            }
            else
            {
                a = false;
            }
            return a;

        }
        [HttpPatch]
        [Route("ChangePassword/{id}")]
        public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordDto changePasswordModel)
        {
            var user = await _userDbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(); 
            }

            var passwordChangeResult = await _userManager.ChangePasswordAsync(user, changePasswordModel.CurrentPassword, changePasswordModel.NewPassword);

            if (!passwordChangeResult.Succeeded)
            {
                return BadRequest(new { errors = passwordChangeResult.Errors }); 
            }

            return Ok();
        }

        [HttpGet]
        [Route("getAllTeachers")]
        public async Task<IActionResult> getAllTeachers()
        {
            var teachers = await _userDbContext.Users.Where(ur => ur.Role == "TEACHER").ToListAsync();
            if(teachers == null)
            {
                return NotFound("Nie znaleziono żadnego nauczyciela");
            }

            return Ok(teachers);
        }
    }
}
