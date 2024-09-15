using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Report
{
    public class AnswerToTheReport
    {
        [Key]
        public int Id { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }
        public string AnswerText { get; set; }
        public int ReportId { get; set; }
        public DateTime AnswerDate { get; set; } = DateTime.UtcNow;
        [ForeignKey("ReportId")]
        [JsonIgnore]
        public ProblemReport ? Report { get; set; }

    }
}
