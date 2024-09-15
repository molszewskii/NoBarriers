using System.ComponentModel.DataAnnotations;

namespace back_nobarriers.Models.Authentication.Login
{
    public class LoginUser
    {
        [EmailAddress]
        [Required(ErrorMessage ="Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage ="Password is required")]
        public string Password { get; set; }
    }
}
