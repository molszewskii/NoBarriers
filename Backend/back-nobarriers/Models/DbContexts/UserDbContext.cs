using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public class UserDbContext : IdentityDbContext<User>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            userRoles(builder);

        }
        private void userRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Name = "ADMIN", ConcurrencyStamp = "0", NormalizedName = "ADMIN" },
                new IdentityRole() { Name = "USER", ConcurrencyStamp = "1", NormalizedName = "USER" },
                new IdentityRole() { Name = "TEACHER", ConcurrencyStamp = "2", NormalizedName = "TEACHER" });
        }
    }
}
