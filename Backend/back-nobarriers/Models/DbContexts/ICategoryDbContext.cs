using back_nobarriers.Models.Categories;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public interface ICategoryDbContext
    {
        DbSet<Category> Categories { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
