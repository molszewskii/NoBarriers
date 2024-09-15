using back_nobarriers.Models;
using back_nobarriers.Models.Categories;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Dtos;
using back_nobarriers.Models.FlashCards;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardController : ControllerBase
    {
        private readonly FlashCardDbContext _context;
        private readonly CategoryDbContext _categoryDbContext;

        public FlashCardController(FlashCardDbContext context, CategoryDbContext categoryDbContext)
        {
            _context = context;
            _categoryDbContext = categoryDbContext;
        }

        [HttpPost("createFlashCardBox")]
        public async Task<IActionResult> CreateFlashCardBox([FromBody] FlashCardBoxDto request)
        {
            if(request.FlashCards == null || request.FlashCards.Count < 2)
            {
                return BadRequest(new Response { Status = "Error", Message = "Musisz dodać conajmniej dwie fiszki" });
            }

            var box = new FlashCardBox
            {
                Title = request.Title,
                Author = request.Author,
                UserId = request.UserId,
                NumberOfTerms = request.FlashCards.Count,
                Cards = request.FlashCards,
                CategoryId = request.CategoryId,
                LanguageId = request.LanguageId
            };
            _context.FlashCardBoxes.Add(box);
            await _context.SaveChangesAsync();
            return Ok(box);
        }

        [HttpGet("getAllBoxes/{languageId}")]
        public async Task<IActionResult> GetAllBoxes(int languageId)
        {
            var boxes = await _context.FlashCardBoxes.Where(l=>l.LanguageId == languageId).ToListAsync();
            var result = new List<object>();
            foreach (var box in boxes)
            {
                var categoryName = await _categoryDbContext.Categories.Where(c=>c.Id == box.CategoryId).Select(c=>c.Name).FirstOrDefaultAsync();
                result.Add(new
                {
                    box.Id,
                    box.Title,
                    box.NumberOfTerms,
                    box.Author,
                    box.UserId,
                    box.Cards,
                    box.CategoryId,
                    CategoryName = categoryName
                });
            }
            return Ok(result);
        }

        [HttpGet("{boxId}")]
        public async Task<IActionResult> GetBox(int boxId)
        {
            var box = await _context.FlashCardBoxes.FindAsync(boxId);
            if(box == null)
            {
                return NotFound();
            }
            return Ok(box);
        }
        [HttpGet("{boxId}/cards")]
        public IActionResult GetCardsInBox(int boxId)
        {
            var cards = _context.FlashCards.Where(c => c.FlashCardBoxId == boxId).ToList();
            return Ok(cards);
        }
        [HttpPost("addBoxToFav/{boxId}/{userId}")]
        public async Task<IActionResult> AddBoxToFavourite(int boxId, string userId)
        {
            var likedBox = _context.LikedBoxes.FirstOrDefault(u=>u.UserId == userId && u.BoxId == boxId);
            if (likedBox == null)
            {
                likedBox = new LikedBox
                {
                    UserId = userId,
                    BoxId = boxId,
                    IsIconClicked = true
                };
                _context.LikedBoxes.Add(likedBox);
            }
            else
            {
                likedBox.IsIconClicked = true;
            }
            _context.SaveChanges();
            return Ok(likedBox);
        }

        [HttpGet("getFavBoxes/{userId}")]
        public async Task<IActionResult> GetLikedBoxes(string userId)
        {
            var likedBoxes = await _context.LikedBoxes
                .Where(l => l.UserId == userId && l.IsIconClicked)
                .Include(l => l.Box)
                .ToListAsync();

            var likedBoxesWithCategoryNames = new List<object>();

            foreach (var likedBox in likedBoxes)
            {
                var categoryName = await _categoryDbContext.Categories
                    .Where(n => n.Id == likedBox.Box.CategoryId)
                    .Select(n => n.Name)
                    .FirstOrDefaultAsync();

                likedBoxesWithCategoryNames.Add(new
                {
                    likedBox.Box.Id,
                    likedBox.Box.Title,
                    likedBox.Box.NumberOfTerms,
                    likedBox.Box.Author,
                    likedBox.Box.UserId,
                    likedBox.Box.Cards,
                    likedBox.Box.CategoryId,
                    CategoryName = categoryName
                });
            }

            return Ok(likedBoxesWithCategoryNames);
        }



        [HttpGet("getMyBoxes/{userId}")]
        public async Task<IActionResult> GetMyBoxes(string userId)
        {
            var boxes = await _context.FlashCardBoxes
                .Where(c => c.UserId == userId)
                .ToListAsync();

            var boxesWithCategoryNames = new List<object>();

            foreach (var box in boxes)
            {
                var categoryName = await _categoryDbContext.Categories
                    .Where(n => n.Id == box.CategoryId)
                    .Select(n => n.Name)
                    .FirstOrDefaultAsync();

                boxesWithCategoryNames.Add(new
                {
                    box.Id,
                    box.Title,
                    box.NumberOfTerms,
                    box.Author,
                    box.UserId,
                    box.Cards,
                    box.CategoryId,
                    CategoryName = categoryName
                });
            }

            return Ok(boxesWithCategoryNames);
        }

    }
}
