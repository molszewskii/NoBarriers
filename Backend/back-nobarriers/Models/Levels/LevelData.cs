using back_nobarriers.Models.Languages;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Levels
{
    public class LevelData
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public string Translation { get; set; }
        public string Sentence { get; set; }
        public string SentenceTranslation { get; set; }
        public int LevelId { get; set; }
        [JsonIgnore]
        public Level ? Level { get; set; }
        public int LanguageId { get; set; }
        [ForeignKey("LanguageId")]
        [JsonIgnore]
        public Language ? Language { get; set; }
    }

    public class LevelDataGrammar
    {
        [Key]
        public int Id { get; set; }
        public string Theory { get; set; }
        public string Rule { get; set; }
        public string Example { get; set; } 
        public string Exercise { get; set; } 
        public string ExerciseSolution { get; set; } 
        public string ExerciseType { get; set; }
        public int LevelId { get; set; } 
        [JsonIgnore]
        public virtual Level ? Level { get; set; } 
        public int LanguageId { get; set; }
        [ForeignKey("LanguageId")]
        [JsonIgnore]
        public virtual Language ? Language { get; set; }
    }
}
