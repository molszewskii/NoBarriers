using back_nobarriers.Models.Tests;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Report
{
    public class ProblemReport
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Description { get; set; }
        public DateTime ReportDate { get; set; } = DateTime.UtcNow;
        public string RecipientId { get; set; }
        
        public int TestId { get; set; }
        [ForeignKey("TestId")]
        [JsonIgnore]
        public Test ? Test { get; set; }
    }
}
