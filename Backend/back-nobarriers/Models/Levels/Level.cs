using back_nobarriers.Models.Categories;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Levels
{
    public class Level
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [JsonIgnore]
        public Category ? Category { get; set; }
    }
}
