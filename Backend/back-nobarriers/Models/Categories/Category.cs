using System.ComponentModel.DataAnnotations;

namespace back_nobarriers.Models.Categories
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
