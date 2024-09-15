using back_nobarriers.Models.Tests;
using Microsoft.EntityFrameworkCore;

namespace back_nobarriers.Models.DbContexts
{
    public interface ITestDbContext
    {
        DbSet<Test> Tests { get; set; }
        DbSet<Question> Questions { get; set; }
        DbSet<Option> Options { get; set; }
        DbSet<TestResult> TestResults { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
