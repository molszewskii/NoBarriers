using back_nobarriers.Models.FlashCards;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public interface IFlashCardDbContext
    {
        DbSet<FlashCard> FlashCards { get; set; }
        DbSet<FlashCardBox> FlashCardBoxes { get; set; }
        DbSet<LikedBox> LikedBoxes { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
