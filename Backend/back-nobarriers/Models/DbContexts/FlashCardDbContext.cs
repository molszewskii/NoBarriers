using back_nobarriers.Models.FlashCards;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public class FlashCardDbContext : DbContext 
    {
        public FlashCardDbContext(DbContextOptions<FlashCardDbContext> options) : base(options) { }

        public DbSet<FlashCard> FlashCards { get; set; }
        public virtual DbSet<FlashCardBox> FlashCardBoxes { get; set; }
        public DbSet<LikedBox> LikedBoxes { get; set;}
    }
}
