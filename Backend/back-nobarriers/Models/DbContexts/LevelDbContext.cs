using back_nobarriers.Models.Levels;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public class LevelDbContext : DbContext
    {
        public LevelDbContext(DbContextOptions<LevelDbContext> options) : base(options) { }
        public DbSet<LevelData> LevelData { get; set; }
        public DbSet<LevelDataGrammar> LevelDataGrammar { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<UserLevelProgress> UserLevelProgress { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LevelData>()
            .HasOne(t => t.Level)
            .WithMany()
            .HasForeignKey(t => t.LevelId);
            
            modelBuilder.Entity<UserLevelProgress>()
           .HasOne(ulp => ulp.Level)
           .WithMany()
           .HasForeignKey(ulp => ulp.LevelId);
        }
    }
}
