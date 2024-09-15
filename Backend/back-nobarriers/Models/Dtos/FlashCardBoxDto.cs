using back_nobarriers.Models.FlashCards;

namespace back_nobarriers.Models.Dtos
{
    public class FlashCardBoxDto
    {
        public string Title { get; set; }
        public string Author { get; set; }

        public string UserId { get; set; }

        public List<FlashCard> FlashCards { get; set; }
        public int CategoryId { get; set; }
        public int LanguageId { get; set; }
    }
}
