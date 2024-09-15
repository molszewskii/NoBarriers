using back_nobarriers.Models.Files;
using Microsoft.EntityFrameworkCore;
using File = back_nobarriers.Models.Files.File;

namespace back_nobarriers.Models.DbContexts
{
    public class FileDbContext : DbContext
    {
        public FileDbContext(DbContextOptions<FileDbContext> options) : base(options) { }
        public DbSet<File> Files { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<File>()
                .HasOne(f => f.User)
                .WithMany()
                .HasForeignKey(f => f.UserId);
        }
    }
}
