using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Forum
{
    public class ForumQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        [JsonIgnore]
        public User? User { get; set; }
        public string ? AuthorName { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public List<Comment> ? CommentsList { get; set; }

    }
}
