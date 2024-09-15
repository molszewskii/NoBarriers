using back_nobarriers.Models;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Levels;
using back_nobarriers.Models.UserAchievement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /*[Authorize(Roles ="ADMIN")]*/
    public class AdminController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly UserDbContext _userDbContext;
        private readonly UserAchievementDbContext _userAchievementDbContext;
        private readonly LevelDbContext _levelDbContext;
        private readonly LanguageDbContext _languageDbContext;
        private readonly CategoryDbContext _categoryDbContext;

        public AdminController(UserManager<User> userManager, UserDbContext userDbContext, UserAchievementDbContext userAchievementDbContext, LevelDbContext levelDbContext, LanguageDbContext languageDbContext, CategoryDbContext categoryDbContext)
        {
            _userManager = userManager;
            _userDbContext = userDbContext;
            _userAchievementDbContext = userAchievementDbContext;
            _levelDbContext = levelDbContext;
            _languageDbContext = languageDbContext;
            _categoryDbContext = categoryDbContext;
        }

        [HttpGet]
        [Route("getAllUsers")]
        public async Task<IEnumerable> GetAllUsers()
        {
            return await _userDbContext.Users.ToListAsync();
        }

        //Achievements crud
        [HttpGet("achievements")]
        public async Task<IActionResult> GetAchievements()
        {
            var achievements = await _userAchievementDbContext.Achievements.Include(u => u.UserAchievements).Select(achievement => new
            {
                achievement.Id,
                achievement.Name,
                achievement.MaxValue,
                UsersCount = achievement.UserAchievements.Count,
                achievement.UserAchievements,
            }).ToListAsync();
            return Ok(achievements);
        }

        [HttpGet("achievements/{id}")]
        public async Task<IActionResult> GetAchievementById(int id)
        {
            var achievement = await _userAchievementDbContext.Achievements
            .Include(a => a.UserAchievements)
            .FirstOrDefaultAsync(a => a.Id == id);
            if (achievement == null)
            {
                return NotFound("Achievement not found");
            }
            var result = new
            {
                achievement.Id,
                achievement.Name,
                achievement.MaxValue,
                UsersCount = achievement.UserAchievements.Count,
                UserAchievements = achievement.UserAchievements.Select(ua => new
                {
                    ua.Id,
                    ua.Progress,
                    ua.AchievementId,
                    ua.UserId,
                    UserName = _userManager.FindByIdAsync(ua.UserId).Result?.UserName,
                    Course = _userManager.Users.Where(u=>u.Id == ua.UserId).Select(u=>u.LanguageCourse)
                }).ToList(),
            };



            return Ok(result);
        }

        [HttpPost("achievements")]
        public IActionResult CreateAchievement([FromBody] Achievement achievement)
        {
            _userAchievementDbContext.Achievements.Add(achievement);
            _userAchievementDbContext.SaveChanges();

            return Ok("Achievement created successfully");
        }

        [HttpPut("achievements/{id}")]
        public async Task<IActionResult> UpdateAchievement(int id, [FromBody] Achievement updatedAchievement)
        {
            var existingAchievement = await _userAchievementDbContext.Achievements.FindAsync(id);

            if (existingAchievement == null)
            {
                return NotFound("Achievement not found");
            }

            existingAchievement.Name = updatedAchievement.Name;
            existingAchievement.MaxValue = updatedAchievement.MaxValue;

            _userAchievementDbContext.SaveChanges();

            return Ok("Achievement updated successfully");
        }

        [HttpDelete("achievements/{id}")]
        public async Task<IActionResult> DeleteAchievement(int id)
        {
            var achievement = await _userAchievementDbContext.Achievements.FindAsync(id);

            if (achievement == null)
            {
                return NotFound("Achievement not found");
            }

            _userAchievementDbContext.Achievements.Remove(achievement);
            _userAchievementDbContext.SaveChanges();

            return Ok("Achievement deleted successfully");
        }
        //levels
        [HttpGet("getAllLevels/{languageId}")]
        public async Task<IActionResult> GetLevels(int languageId)
        {
            var levels = await _levelDbContext.Levels.ToListAsync();
            var result = new List<object>();

            foreach (var level in levels)
            {
                int levelDataCount = 0;

                if (level.CategoryId == 1)
                {
                    levelDataCount = await _levelDbContext.LevelData
                                        .Where(l => l.LevelId == level.Id && l.LanguageId == languageId)
                                        .CountAsync();
                }
                else if (level.CategoryId == 2)
                {
                    levelDataCount = await _levelDbContext.LevelDataGrammar
                                        .Where(l => l.LevelId == level.Id && l.LanguageId == languageId)
                                        .CountAsync();
                }

                var languageName = await _languageDbContext.Languages
                                    .Where(l => l.Id == languageId)
                                    .Select(l => l.Name)
                                    .FirstOrDefaultAsync();

                var categoryName = await _categoryDbContext.Categories
                                    .Where(c => c.Id == level.CategoryId)
                                    .Select(c => c.Name)
                                    .FirstOrDefaultAsync();

                var combinedLevel = new
                {
                    level.Id,
                    level.Name,
                    LevelDataCount = levelDataCount,
                    LanguageName = languageName,
                    CategoryName = categoryName,
                };

                result.Add(combinedLevel);
            }

            return Ok(result);
        }


        [HttpGet("levels/{id}/{languageId}")]
        public async Task<IActionResult> GetLevelById(int id, int languageId)
        {
            var level = await _levelDbContext.Levels.FindAsync(id);
            if (level == null)
            {
                return NotFound("Level not found");
            }

            object levelDataList; // Używamy typu object, aby móc przechowywać różne typy danych

            if (level.CategoryId == 1)
            {
                levelDataList = await _levelDbContext.LevelData
                    .Where(l => l.LevelId == level.Id && l.LanguageId == languageId)
                    .ToListAsync();
            }
            else if (level.CategoryId == 2)
            {
                levelDataList = await _levelDbContext.LevelDataGrammar
                    .Where(l => l.LevelId == level.Id && l.LanguageId == languageId)
                    .ToListAsync();
            }
            else
            {
                return NotFound("Unsupported level category");
            }

            // Przetwarzanie danych języka i kategorii poza pętlą
            var languageName = await _languageDbContext.Languages
                                .Where(l => l.Id == languageId)
                                .Select(l => l.Name)
                                .FirstOrDefaultAsync();

            var categoryName = await _categoryDbContext.Categories
                                .Where(c => c.Id == level.CategoryId)
                                .Select(c => c.Name)
                                .FirstOrDefaultAsync();

            var result = new
            {
                level.Id,
                level.Name,
                LevelDataCount = (levelDataList as IList)?.Count ?? 0, // Bezpieczne rzutowanie do IList i sprawdzenie null
                LanguageName = languageName,
                CategoryName = categoryName,
                LevelData = levelDataList // Tutaj przekazujemy listę jako object
            };

            return Ok(result);
        }





        [HttpPost("levels")]
        public IActionResult CreateLevel([FromBody] Level level)
        {
            _levelDbContext.Levels.Add(level);
            _levelDbContext.SaveChanges();

            return Ok("Level created successfully");
        }

        [HttpPut("levels/{id}")]
        public async Task<IActionResult> UpdateLevel(int id, [FromBody] Level updatedLevel)
        {
            var existingLevel = await _levelDbContext.Levels.FindAsync(id);

            if (existingLevel == null)
            {
                return NotFound("Level not found");
            }

            existingLevel.Name = updatedLevel.Name;

            _levelDbContext.SaveChanges();

            return Ok("Level updated successfully");
        }

        [HttpDelete("levels/{id}")]
        public async Task<IActionResult> DeleteLevel(int id)
        {
            var level = await _levelDbContext.Levels.FindAsync(id);
            if (level == null)
            {
                return NotFound("Level not found");
            }

            _levelDbContext.Levels.Remove(level);
            _levelDbContext.SaveChanges();

            return Ok("Level deleted successfully");
        }
        //leveldata
        [HttpGet("leveldata/{levelId}")]
        public async Task<IActionResult> GetLevelData(int levelId)
        {
            var levelData = await _levelDbContext.LevelData
                .Where(ld => ld.LevelId == levelId)
                .ToListAsync();
            if(levelData == null)
            {
                return NotFound("Level data was not found");
            }
            foreach(var ld in levelData)
            {
                var language = await _languageDbContext.Languages.Where(l => l.Id == ld.LanguageId).FirstOrDefaultAsync();
                if(language != null)
                {
                    ld.Language = language;
                }
            }
            
            return Ok(levelData);
        }

        [HttpPost("leveldata")]
        public IActionResult CreateLevelData([FromBody] LevelData levelData)
        {
            _levelDbContext.LevelData.Add(levelData);
            _levelDbContext.SaveChanges();

            return Ok("Level data created successfully");
        }
        [HttpPost("leveldatagrammar")]
        public IActionResult CreateLevelDataGrammar([FromBody] LevelDataGrammar levelDataGrammar)
        {
            _levelDbContext.LevelDataGrammar.Add(levelDataGrammar);
            _levelDbContext.SaveChanges();

            return Ok("Level data created successfully");
        }
        [HttpPut("leveldata/{id}")]
        public async Task<IActionResult> UpdateLevelData(int id, [FromBody] LevelData updatedLevelData)
        {
            var existingLevelData = await _levelDbContext.LevelData.FindAsync(id);

            if (existingLevelData == null)
            {
                return NotFound("Level data not found");
            }

            existingLevelData.Word = updatedLevelData.Word;
            existingLevelData.Translation = updatedLevelData.Translation;
            existingLevelData.Sentence = updatedLevelData.Sentence;
            existingLevelData.SentenceTranslation = updatedLevelData.SentenceTranslation;
            existingLevelData.LevelId = updatedLevelData.LevelId;

            _levelDbContext.SaveChanges();

            return Ok("Level data updated successfully");
        }
        [HttpPut("leveldatagrammar/{id}")]
        public async Task<IActionResult> UpdateLevelDataGrammar(int id, [FromBody] LevelDataGrammar updatedLevelData)
        {
            var existingLevelData = await _levelDbContext.LevelDataGrammar.FindAsync(id);

            if (existingLevelData == null)
            {
                return NotFound("Level data not found");
            }

            existingLevelData.Theory = updatedLevelData.Theory;
            existingLevelData.Rule = updatedLevelData.Rule;
            existingLevelData.Example = updatedLevelData.Example;
            existingLevelData.Exercise = updatedLevelData.Exercise;
            existingLevelData.ExerciseSolution = updatedLevelData.ExerciseSolution;
            existingLevelData.ExerciseType = updatedLevelData.ExerciseType;
            existingLevelData.LevelId = updatedLevelData.LevelId;

            _levelDbContext.SaveChanges();

            return Ok("Level data updated successfully");
        }
        [HttpDelete("leveldata/{id}")]
        public async Task<IActionResult> DeleteLevelData(int id)
        {
            var levelData = await _levelDbContext.LevelData.FindAsync(id);

            if (levelData == null)
            {
                return NotFound("Level data not found");
            }

            _levelDbContext.LevelData.Remove(levelData);
            _levelDbContext.SaveChanges();

            return Ok("Level data deleted successfully");
        }

    }
}
