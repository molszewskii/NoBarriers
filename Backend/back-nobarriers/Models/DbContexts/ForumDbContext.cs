using back_nobarriers.Models.Forum;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public class ForumDbContext : DbContext
    {
        public ForumDbContext(DbContextOptions<ForumDbContext> options) : base(options) { }

        public DbSet<ForumQuestion> ForumQuestions { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>()
            .HasOne(f => f.ForumQuestion)
            .WithMany(c => c.CommentsList)
            .HasForeignKey(k => k.ForumQuestionId);
        }

    }
}
