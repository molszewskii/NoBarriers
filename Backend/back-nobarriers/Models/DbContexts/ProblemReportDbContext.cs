using back_nobarriers.Models.Report;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace back_nobarriers.Models.DbContexts
{
    public class ProblemReportDbContext : DbContext
    {
        public ProblemReportDbContext(DbContextOptions<ProblemReportDbContext> options) : base(options) { }
        public DbSet<ProblemReport> ProblemReports { get; set; }
        public DbSet<AnswerToTheReport> AnswerToTheReports { get; set; }
    }
}
