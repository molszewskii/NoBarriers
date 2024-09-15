using back_nobarriers.Models.Categories;
using back_nobarriers.Models.Languages;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.FlashCards
{
    public class FlashCard
    {
        [Key]
        public int Id { get; set; }
        public string Term { get; set; }
        public string TermTranslation { get; set; }

        public int FlashCardBoxId { get; set; }

    }

    public class FlashCardBox
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public int NumberOfTerms { get; set; }
        public string Author { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User? User { get; set; }
        public List<FlashCard> Cards { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category ? Category { get; set; }
        public int LanguageId { get; set; }
        [ForeignKey("LanguageId")]
        public Language Language { get; set; }

    }

    public class LikedBox
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int BoxId { get; set; }
        public bool IsIconClicked { get; set; }
        [ForeignKey("BoxId")]
        public FlashCardBox Box { get; set; }
       
    }
}
