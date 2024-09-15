using back_nobarriers.Models;
using back_nobarriers.Models.Authentication.Login;
using back_nobarriers.Models.Authentication.Register;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<User> userManager,RoleManager<IdentityRole> roleManager,IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _config = configuration;
        }

        /*
                [HttpPost("login")]
                public async Task<IActionResult> Login([FromBody] LoginUser login)
                {
                    var user = await _userManager.FindByEmailAsync(login.Email);
                    var psd = await _userManager.CheckPasswordAsync(user,login.Password);
                    if(user != null && psd)
                    {
                        var userRoles = await _userManager.GetRolesAsync(user);

                        var claims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Email,login.Email),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                        };

                        foreach (var role in userRoles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, role));
                        }

                        var token = generateToken(claims);

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            userId = user.Id,
                            firstName = user.UserName,
                            lastName = user.Surname,
                            course = user.LanguageCourse,
                        }) ;

                    }
                    return Unauthorized();
                }*/
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            var psd = await _userManager.CheckPasswordAsync(user, login.Password);
            if (user != null && psd)
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, login.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                foreach (var role in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var token = generateToken(claims);

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                Console.WriteLine(tokenString);
                // Ustawienie cookie z tokenem
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true, 
                    SameSite = SameSiteMode.None, 
                    Expires = DateTime.UtcNow.AddDays(7)
                };
                Response.Cookies.Append("AccessToken", tokenString, cookieOptions);

                return Ok(new
                {
                    userId = user.Id,
                    firstName = user.UserName,
                    lastName = user.Surname,
                    course = user.LanguageCourse,
                    role = user.Role
                });
            }
            return Unauthorized();
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser request)
        {
            var userExists = await _userManager.FindByEmailAsync(request.Email);
            if(userExists != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            }
            
            var user = new User
            {
                Email = request.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = request.Name,
                Surname = request.Surname,
                Role = request.Role,
                LanguageCourse = request.LanguageCourse
            };
            var result = await _userManager.CreateAsync(user, request.Password);

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            var role = await _roleManager.FindByNameAsync(request.Role);

            if (role == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Role does not exist." });
            }
            var addToRoleResult = await _userManager.AddToRoleAsync(user, role.Name);

            if (!addToRoleResult.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Failed to assign user role." });
            }

            return Ok(new Response { Status = "Success", Message = "User created" });
        }

        private JwtSecurityToken generateToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));
            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: claims,
                signingCredentials: new SigningCredentials(key,SecurityAlgorithms.HmacSha256)
                );
            return token;
        }
    }
}
