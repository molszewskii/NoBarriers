using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_nobarriers.Models
{
    public class User : IdentityUser
    {
        public string Surname { get; set; }
        public string Role { get; set; }

        public string LanguageCourse { get; set; }
    }
}
