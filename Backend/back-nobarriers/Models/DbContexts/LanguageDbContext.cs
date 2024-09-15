using back_nobarriers.Models.Languages;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
        public class LanguageDbContext : DbContext
        {
            public LanguageDbContext(DbContextOptions<LanguageDbContext> options) : base(options)
            {
            }

            public DbSet<Language> Languages { get; set; }
        }
}
