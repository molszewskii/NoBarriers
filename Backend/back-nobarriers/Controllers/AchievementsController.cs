using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Dtos;
using back_nobarriers.Models.Levels;
using back_nobarriers.Models.UserAchievement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementsController : ControllerBase
    {
        private readonly UserAchievementDbContext _userAchievementDbContext;
        private readonly UserDbContext _userDbContext;

        public AchievementsController(UserAchievementDbContext userAchievementDbContext, UserDbContext userDbContext)
        {
            _userAchievementDbContext = userAchievementDbContext;
            _userDbContext = userDbContext;
        }

        [HttpPost("seed-data")]
        public IActionResult SeedData()
        {
            var achievements = new List<Achievement>
            {
                new Achievement { Name = "Earn 300 points", MaxValue=100 },
                new Achievement { Name = "Earn 400 points" , MaxValue=200 }
            };

            _userAchievementDbContext.Achievements.AddRange(achievements);
            _userAchievementDbContext.SaveChanges();

            return Ok("Dane zostały dodane do bazy danych.");
        }
        [HttpPost]
        [Route("/addUserAchievement/{id}/{progress}")]
        public async Task<IActionResult> addUserAchievement(string id, int progress, [FromBody] AddUserAchievementDto achievement)
        {
            var user = await _userDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Użytkownik nie został znaleziony");
            }

            var existingAchievement = await _userAchievementDbContext.Achievements.FirstOrDefaultAsync(a=>a.Name == achievement.Name);
            if (existingAchievement == null)
            {
                return BadRequest("Osiągnięcie nie istnieje");
            }
            var userAchievement = await _userAchievementDbContext.UserAchievements
                .Where(ua => ua.UserId == id && ua.AchievementId == existingAchievement.Id)
                .FirstOrDefaultAsync();
            if (userAchievement == null)
            {
                 userAchievement = new UserAchievements
                {
                    AchievementId = existingAchievement.Id,
                    UserId = user.Id,
                    Progress = progress,
                };
                _userAchievementDbContext.UserAchievements.Add(userAchievement);
                await _userAchievementDbContext.SaveChangesAsync();
            }
            else
            {
                userAchievement.Progress += progress;
                _userAchievementDbContext.SaveChanges();
            }
           
            return Ok("Został dodany progress do osiągnięcia użytkownika");

        }

        [HttpGet]
        [Route("/getUsersAchievements/{id}")]
        public async Task<IActionResult> getUsersAchievements(string id)
        {
            var user = await _userDbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Nie znaleziono Usera");
            }
            var userAchievements = await _userAchievementDbContext.UserAchievements
        .Where(u => u.UserId == id)
        .Join(_userAchievementDbContext.Achievements,
              ua => ua.AchievementId,
              a => a.Id,
              (ua, a) => new
              {
                  ua.Id,
                  ua.Progress,
                  ua.AchievementId,
                  Achievement = a,
                  ua.UserId
              })
        .ToListAsync();
            return Ok(userAchievements);
        }

        [HttpGet]
        [Route("/getAllAchievements/{userId}")]
        public async Task<IActionResult> GetAllAchievements(string userId)
        {
             var userAchievements = await _userAchievementDbContext.UserAchievements
             .Where(u => u.UserId == userId)
             .Include(u => u.Achievement)
             .ToListAsync();

            var allAchievements = await _userAchievementDbContext.Achievements
                .ToListAsync();

            allAchievements = allAchievements
                .Where(a => !userAchievements.Any(ua => ua.AchievementId == a.Id))
                .ToList();

            var joinedUserAchievements = userAchievements
                .Join(
                    _userAchievementDbContext.Achievements,
                    ua => ua.AchievementId,
                    a => a.Id,
                    (ua, a) => new
                    {
                        ua.Id,
                        ua.Progress,
                        ua.AchievementId,
                        Achievement = a,
                        ua.UserId
                    })
                .ToList();

            allAchievements.AddRange(joinedUserAchievements.Select(jua => jua.Achievement));

            return Ok(allAchievements);
        }

    }
}
