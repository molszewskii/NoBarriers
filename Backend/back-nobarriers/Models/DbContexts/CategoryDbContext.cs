using back_nobarriers.Models.Categories;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public class CategoryDbContext :DbContext
    {
        public CategoryDbContext(DbContextOptions<CategoryDbContext> options) : base(options) { }
        public virtual DbSet<Category> Categories { get; set; }
    }
}
