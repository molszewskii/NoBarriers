using back_nobarriers.Models.UserAchievement;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public class UserAchievementDbContext : DbContext
    {
        public UserAchievementDbContext(DbContextOptions<UserAchievementDbContext> options) : base(options) { }

        public DbSet<UserAchievements> UserAchievements { get; set; }
        public DbSet<Achievement> Achievements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserAchievements>()
                .HasOne(ua => ua.Achievement)
                .WithMany(a => a.UserAchievements)
                .HasForeignKey(ua => ua.AchievementId);
        }
    }
}
