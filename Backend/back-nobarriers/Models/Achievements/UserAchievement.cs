using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.UserAchievement
{

    public class UserAchievements
    {
        [Key]
        public int Id { get; set; }
        public int Progress { get; set; }

        public int AchievementId { get; set; }
        [JsonIgnore]
        public Achievement Achievement { get; set; }

        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User { get; set; }
    }

    public class Achievement
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int MaxValue { get; set; }
        public List<UserAchievements> ? UserAchievements { get; set; }
    }


}
