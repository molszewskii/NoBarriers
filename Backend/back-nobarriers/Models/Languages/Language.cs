using System.ComponentModel.DataAnnotations;

namespace back_nobarriers.Models.Languages
{
    public class Language
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }


    }
}
