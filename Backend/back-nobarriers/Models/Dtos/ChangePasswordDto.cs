using System.ComponentModel.DataAnnotations;

namespace back_nobarriers.Models.Dtos
{
    public class ChangePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
