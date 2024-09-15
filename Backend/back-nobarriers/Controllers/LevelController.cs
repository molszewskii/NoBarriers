using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Levels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LevelController : ControllerBase
    {
        private readonly LevelDbContext _context;
        private readonly CategoryDbContext _categoryDbContext;

        public LevelController(LevelDbContext dbContext, CategoryDbContext categoryDbContext)
        {
            _context = dbContext;
            _categoryDbContext = categoryDbContext;
        }

        [HttpPost("seed-data")]
        public IActionResult SeedData()
        {
            var additionalLevelData = new List<LevelData>
{
    new LevelData
    {
        Word = "apple",
        Translation = "jabłko",
        Sentence = "I like to eat an apple every day.",
        SentenceTranslation = "Lubię jeść jabłko codziennie.",
        LevelId = 6,
        LanguageId = 1
    },
    new LevelData
    {
        Word = "banana",
        Translation = "banan",
        Sentence = "Bananas are a healthy snack.",
        SentenceTranslation = "Banany są zdrową przekąską.",
        LevelId = 6,
        LanguageId = 1
    },
    new LevelData
    {
        Word = "orange",
        Translation = "pomarańcza",
        Sentence = "I drink orange juice in the morning.",
        SentenceTranslation = "Piję sok pomarańczowy rano.",
        LevelId = 6,
        LanguageId = 1
    },
    new LevelData
    {
        Word = "grape",
        Translation = "winogrono",
        Sentence = "I like to snack on grapes.",
        SentenceTranslation = "Lubię przekąsić winogrona.",
        LevelId = 6,
        LanguageId = 1
    },
    new LevelData
    {
        Word = "strawberry",
        Translation = "truskawka",
        Sentence = "Strawberries are my favorite fruit.",
        SentenceTranslation = "Truskawki są moim ulubionym owocem.",
        LevelId = 6,
        LanguageId = 1
    },
    new LevelData
    {
        Word = "pear",
        Translation = "gruszka",
        Sentence = "Pears are delicious when ripe.",
        SentenceTranslation = "Gruszki są pyszne, gdy dojrzałe.",
        LevelId = 6,
        LanguageId = 1
    },
    new LevelData
    {
        Word = "melon",
        Translation = "melon",
        Sentence = "We bought a watermelon for dessert.",
        SentenceTranslation = "Kupiliśmy melona na deser.",
        LevelId = 6,
        LanguageId = 1
    }
};

            _context.LevelData.AddRange(additionalLevelData);
            _context.SaveChanges();

            /* var userLevelProgress = new List<UserLevelProgress>
             {
                     new UserLevelProgress { UserId = "e01f8fd8-185f-43b9-a267-ad30b781da15", LevelId = 2, IsCompleted = false },
                     new UserLevelProgress { UserId = "e01f8fd8-185f-43b9-a267-ad30b781da15", LevelId = 3, IsCompleted = false },
             };
             _context.UserLevelProgress.AddRange(userLevelProgress);
             _context.SaveChanges();*/
            return Ok("Dane zostały dodane do bazy danych.");
        }
        [HttpPost]
        [Route("/addNewCompletedLevel/{userId}/{levelId}")]
        public async Task<IActionResult> AddNewCompletedLevel(string userId,int levelId)
        {
            var levelid = await _context.Levels.Where(l => l.Name.EndsWith(levelId.ToString())).Select(l=>l.Id).FirstOrDefaultAsync();
            var existingRecord = await _context.UserLevelProgress
             .FirstOrDefaultAsync(ulp => ulp.UserId == userId && ulp.LevelId == levelid);

            if (existingRecord != null)
            {
                return BadRequest("Ukończony poziom już istnieje dla tego użytkownika.");
            }
            var userLevelCompleted = new UserLevelProgress
            {
                UserId = userId,
                LevelId = levelid,
                IsCompleted = true,
            };
            _context.UserLevelProgress.Add(userLevelCompleted);
            _context.SaveChanges();
            return Ok("Dodano ukończony poziom do użytkownika");
        }
        [HttpGet]
        [Route("/getUserLevelProgress/{userId}/{levelId}")]
        public async Task<IActionResult> GetUserLevelProgress(string userId, int levelId)
        {
            var userLevelProgress = await _context.UserLevelProgress
                .Where(ulp => ulp.UserId == userId && ulp.LevelId == levelId)
                .FirstOrDefaultAsync();

            return Ok(userLevelProgress);
        }
        [HttpGet]
        [Route("/getAllCompletedUserLevels/{userId}")]
        public async Task<IActionResult> GetAllCompletedUserLevels(string userId)
        {
            var userLevelProgresses = await _context.UserLevelProgress
                .Where(ulp => ulp.UserId == userId && ulp.IsCompleted == true)
                .ToListAsync();
            return Ok(userLevelProgresses);
        }
        [HttpPost]
        [Route("/updateUserLevelProgress/{userId}/{levelId}/{isCompleted}")]
        public async Task<IActionResult> UpdateUserLevelProgress(string userId, int levelId, bool isCompleted)
        {
            var userLevelProgress = await _context.UserLevelProgress
                .Where(ulp => ulp.UserId == userId && ulp.LevelId == levelId)
                .FirstOrDefaultAsync();

            if (userLevelProgress != null)
            {
                userLevelProgress.IsCompleted = isCompleted;
                await _context.SaveChangesAsync();
            }

            return Ok("Postęp użytkownika został zaktualizowany");
        }
        [HttpGet]
        [Route("/getDataLevel/{id}/{languageId}")]
        public async Task<IActionResult> GetDataLevel(int id,int languageId)
        {
            var level = await _context.Levels.Where(l=>l.Name.EndsWith(id.ToString())).FirstOrDefaultAsync();
            if (level == null)
            {
                return NotFound("Level not found");
            }   
            object result;
            var categoryName = await _categoryDbContext.Categories.Where(c => c.Id == level.CategoryId).Select(c => c.Name).FirstOrDefaultAsync();
            if (level.CategoryId == 1)
            {
                 var data = await _context.LevelData
                .Where(ld => ld.LevelId == level.Id && ld.LanguageId == languageId)
                .ToListAsync();
                result = new
                {
                    Data = data,
                    CategoryName = categoryName
                };
            }else if(level.CategoryId == 2)
            {
                var data = await _context.LevelDataGrammar
                .Where(ld => ld.LevelId == level.Id && ld.LanguageId == languageId)
                .ToListAsync();
                result = new
                {
                    Data = data,
                    CategoryName = categoryName
                };
            }
            else
            {
                return BadRequest("Unsupported CategoryId");
            }

            return Ok(result);
        }
        [HttpGet]
        [Route("getAllLevels")]
        public async Task<IActionResult> GetAllLevels()
        {
            var levels = await _context.Levels.ToListAsync();
            if(levels == null)
            {
                return NotFound("There are no levels added");
            }
            return Ok(levels);
        }
    }
}
