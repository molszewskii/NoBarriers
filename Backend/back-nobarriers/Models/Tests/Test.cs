using back_nobarriers.Models.Categories;
using back_nobarriers.Models.FlashCards;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_nobarriers.Models.Tests
{
    public class Test
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public User ? User { get; set; }
        public string TestName { get; set; }
        public List<Question> Questions { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [JsonIgnore]
        public Category ? Category { get; set; }
        public int  FlashCardBoxId { get; set; }
        [JsonIgnore]
        [ForeignKey("FlashCardBoxId")]
        public FlashCardBox ? FlashCardBox { get; set; }
    }

    public class Question
    {
        [Key]
        public int Id { get; set; }
        public int TestId { get; set; }
        public string QuestionText { get; set; }
        [JsonIgnore]
        public Test? Test { get; set; }
        public List<Option> Options { get; set; }
    }

    public class Option
    {
        [Key]
        public int Id { get; set; }
        public int QuestionId { get; set; }
        [JsonIgnore]
        public Question? Question { get; set; }
        public string OptionText { get; set; }
        public bool IsCorrect { get; set; }
    }
    public class UserAnswer
    {
        [Key]
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Answer { get; set; }
        [JsonIgnore]
        public int ? TestResultId { get; set; }
        [ForeignKey("TestResultId")]
        [JsonIgnore]
        public TestResult? TestResult { get; set; }

    }
    public class CorrectAnswer
    {
        [Key]
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string CorrectAnswerText { get; set; }
        [JsonIgnore]
        public int ? TestResultId { get; set; }
        [ForeignKey("TestResultId")]
        [JsonIgnore]
        public TestResult? TestResult { get; set; }
    }
    public class TestResult
    {
        [Key]
        public int Id { get; set; }
        public int TestId { get; set; }
        public string UserId { get; set; }
        public int Score { get; set; }
        public List<UserAnswer> UserAnswers { get; set; }
        public List<CorrectAnswer> CorrectAnswers { get; set; }
        public DateTime DateTaken { get; set; }

        [JsonIgnore]
        public Test? Test { get; set; }
    }



}
