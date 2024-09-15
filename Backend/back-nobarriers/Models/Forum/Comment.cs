using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Forum
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Descritpion { get; set; }
        public string AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        [JsonIgnore]
        public User? User { get; set; }
        public string ? AuthorName { get; set; } = string.Empty;
        public int ForumQuestionId { get; set; }
        public DateTime Timestamp { get; set; }
        [JsonIgnore]
        public ForumQuestion ? ForumQuestion { get; set; }
    }
}
