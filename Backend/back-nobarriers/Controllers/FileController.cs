using back_nobarriers.Models;
using back_nobarriers.Models.DbContexts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly FileDbContext _context;
        private readonly UserManager<User> _userManager;

        public FileController(FileDbContext context,UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        [HttpGet("download-by-name/{fileName}")]
        public async Task<IActionResult> DownloadFileByName(string fileName)
        {
            try
            {
                if (string.IsNullOrEmpty(fileName))
                {
                    return BadRequest("Invalid file name");
                }

                // Wyszukaj plik w bazie danych na podstawie nazwy
                var file = await _context.Files.FirstOrDefaultAsync(f => f.FileName == fileName);

                if (file == null)
                {
                    return NotFound("File not found");
                }

                // Otwórz plik i zwróć go jako strumień
                var memory = new MemoryStream();
                using (var stream = new FileStream(file.FilePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;

                // Określ typ zawartości pliku
                var contentType = GetContentType(file.FilePath);

                // Zwróć plik jako odpowiedź HTTP
                return File(memory, contentType, Path.GetFileName(file.FilePath));
            }
            catch (Exception ex)
            {
                var response = new Response
                {
                    Status = "error",
                    Message = ex.Message
                };
                if (ex.InnerException != null)
                {
                    response.Message += " InnerException: " + ex.InnerException.Message;
                }

                return BadRequest(response);
            }
        }

        [HttpPost]
        [Route("upload/{userId}")]
        public async Task<IActionResult> UploadFile(IFormFile file, string userId)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("Invalid file");
                }

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                var fileName = file.FileName;
                var filePath = Path.Combine("uploads", fileName);
                int i = 1;
                while (System.IO.File.Exists(filePath))
                {
                    filePath = Path.Combine("uploads", Path.GetFileNameWithoutExtension(file.FileName) + "_" + i + Path.GetExtension(file.FileName));
                    i++;
                }
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var newFile = new Models.Files.File
                {
                    FileName = fileName,
                    FilePath = filePath,
                    UploadDate = DateTime.Now,
                    UserId = user.Id
                };

                _context.Files.Add(newFile);
                await _context.SaveChangesAsync();

                return Ok(newFile);
            }catch (Exception ex)
            {
                var response = new Response
                {
                    Status = "error",
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
        [Route("get-files/{userId}")]
        public async Task<IActionResult> GetFiles(string userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                var userFiles = await _context.Files
                    .Where(file => file.UserId == userId)
                    .ToListAsync();

                return Ok(userFiles);
            }
            catch (Exception ex)
            {
                var response = new Response
                {
                    Status = "error",
                    Message = ex.Message
                };
                if (ex.InnerException != null)
                {
                    response.Message += " InnerException: " + ex.InnerException.Message;
                }

                return BadRequest(response);
            }
        }
        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var file = await _context.Files.FindAsync(id);

            if (file == null)
            {
                return NotFound();
            }

            var memory = new MemoryStream();
            using (var stream = new FileStream(file.FilePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;

            return File(memory, GetContentType(file.FilePath), Path.GetFileName(file.FilePath));
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
    {
        {".pdf", "application/pdf"},
    };
        }

    }
}
