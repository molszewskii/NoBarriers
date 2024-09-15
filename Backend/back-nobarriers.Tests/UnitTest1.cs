using back_nobarriers.Controllers;
using back_nobarriers.Models;
using back_nobarriers.Models.Categories;
using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.FlashCards;
using back_nobarriers.Models.Tests;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Collections.Generic;
using Moq.EntityFrameworkCore;
namespace back_nobarriers.Tests
{
    public class UnitTest1
    {
        /*[Fact]
        public async Task GetAllTests_ReturnsOk_WithTests()
        {
            var store = new Mock<IUserStore<User>>();
            var mockUserManager = new Mock<UserManager<User>>(store.Object, null, null, null, null, null, null, null, null);
            mockUserManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(new User { UserName = "Anna", Surname = "Opanowicz" });

            var mockTestContext = new Mock<ITestDbContext>();
            var data = new List<Test>
            {
                new Test { Id = 5, UserId = "fd3dd0f8-aad4-4975-9728-c230efbddcb7", TestName = "Test1" ,CategoryId = 1, FlashCardBoxId = 1 },

            }.AsQueryable();

            var questionsData = new List<Question>
            {
                new Question { TestId = 5, QuestionText = "Translate the word:\"MOUSE\""},
                new Question { TestId = 5, QuestionText = "Translate the word:\"BAG\""},
            }.AsQueryable();
            var mockSet = new Mock<DbSet<Test>>();
            mockSet.As<IQueryable<Test>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Test>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Test>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Test>>().Setup(m => m.GetEnumerator()).Returns(data.GetEnumerator());

            mockTestContext.Setup(c => c.Tests).ReturnsDbSet(data);
            mockTestContext.Setup(c => c.Questions).ReturnsDbSet(questionsData);
            var mockCategoryContext = new Mock<ICategoryDbContext>();

            var categories = new List<Category>
            {
                new Category { Id = 1, Name = "VOCABULARY" },
            }.AsQueryable();

            var mockCategorySet = new Mock<DbSet<Category>>();
            mockCategorySet.As<IQueryable<Category>>().Setup(m => m.Provider).Returns(categories.Provider);
            mockCategorySet.As<IQueryable<Category>>().Setup(m => m.Expression).Returns(categories.Expression);
            mockCategorySet.As<IQueryable<Category>>().Setup(m => m.ElementType).Returns(categories.ElementType);
            mockCategorySet.As<IQueryable<Category>>().Setup(m => m.GetEnumerator()).Returns(categories.GetEnumerator());
            mockCategoryContext.Setup(c => c.Categories).ReturnsDbSet(categories);

            var mockFlashCardContext = new Mock<IFlashCardDbContext>();
            var flashCardBoxes = new List<FlashCardBox>
            {
                new FlashCardBox
                {
                    Id = 1,
                    Cards = new List<FlashCard>
                    {
                        new FlashCard { Id = 1, Term = "lecimy", TermTranslation = "tutaj", FlashCardBoxId = 1 },
                        new FlashCard { Id = 2, Term = "lecimy", TermTranslation = "tutaj", FlashCardBoxId = 1 }
                    }
                },
            }.AsQueryable();

            var mockFlashCardBoxSet = new Mock<DbSet<FlashCardBox>>();
            mockFlashCardBoxSet.As<IQueryable<FlashCardBox>>().Setup(m => m.Provider).Returns(flashCardBoxes.Provider);
            mockFlashCardBoxSet.As<IQueryable<FlashCardBox>>().Setup(m => m.Expression).Returns(flashCardBoxes.Expression);
            mockFlashCardBoxSet.As<IQueryable<FlashCardBox>>().Setup(m => m.ElementType).Returns(flashCardBoxes.ElementType);
            mockFlashCardBoxSet.As<IQueryable<FlashCardBox>>().Setup(m => m.GetEnumerator()).Returns(flashCardBoxes.GetEnumerator());
            mockFlashCardContext.Setup(c => c.FlashCardBoxes).ReturnsDbSet(flashCardBoxes);


            var controller = new TestController(mockUserManager.Object, mockTestContext.Object, mockCategoryContext.Object, mockFlashCardContext.Object);

            // Act
            var result = await controller.GetAllTests();

            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<object>>(viewResult.Value);
            Assert.NotEmpty(model);

            var expectedNumberOfTests = 1;
            Assert.Equal(expectedNumberOfTests, model.Count());
        }*/

    }
}