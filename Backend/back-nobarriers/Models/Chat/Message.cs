using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Chat
{
    public class Message
    {
        public int Id { get; set; }
        public string ? SenderId { get; set; }
        public string ? RecipientId { get; set; }
        public string Content { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
