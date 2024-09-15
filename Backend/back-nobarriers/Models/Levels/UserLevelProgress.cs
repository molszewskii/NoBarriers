namespace back_nobarriers.Models.Levels
{
    public class UserLevelProgress
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int LevelId { get; set; }
        public bool IsCompleted { get; set; }

        public Level Level { get; set; }
    }
}
