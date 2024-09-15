using System.ComponentModel.DataAnnotations;

namespace back_nobarriers.Models.Files
{
    public class File
    {
        [Key]
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public DateTime UploadDate { get; set; }

        public string UserId { get; set; }
        public User? User { get; set; }
    }
}
