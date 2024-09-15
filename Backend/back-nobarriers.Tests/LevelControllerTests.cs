using back_nobarriers.Models.DbContexts;
using back_nobarriers.Models.Levels;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace back_nobarriers.Tests
{
    public class LevelControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Program> _factory;

        public LevelControllerTests(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }
        public async Task InitializeDbForTests(LevelDbContext db)
        {
            var testUserId = "e01f8fd8-185f-43b9-a267-ad30b781da15";

            db.UserLevelProgress.AddRange(
                new UserLevelProgress { UserId = testUserId, LevelId = 1, IsCompleted = true },
                new UserLevelProgress { UserId = testUserId, LevelId = 2, IsCompleted = true },
                new UserLevelProgress { UserId = testUserId, LevelId = 3, IsCompleted = false },
                new UserLevelProgress { UserId = "e3ecdf59-05c3-4a7a-9981-7d0cd0420433", LevelId = 1, IsCompleted = true }
            );

            await db.SaveChangesAsync();
        }
        [Fact]
        public async Task Test_GetAllCompletedUserLevels()
        {
            using (var scope = _factory.Services.CreateScope())
            {
                var scopedServices = scope.ServiceProvider;
                var db = scopedServices.GetRequiredService<LevelDbContext>();
                await InitializeDbForTests(db); 
            }

            var userId = "e01f8fd8-185f-43b9-a267-ad30b781da15";
            var response = await _client.GetAsync($"/getAllCompletedUserLevels/{userId}");


            response.EnsureSuccessStatusCode();
            var stringResponse = await response.Content.ReadAsStringAsync();
            var userLevelProgresses = JsonConvert.DeserializeObject<List<UserLevelProgress>>(stringResponse);

            Assert.NotNull(userLevelProgresses);
            Assert.Equal(2, userLevelProgresses.Count); 
            Assert.All(userLevelProgresses, ulp => Assert.True(ulp.IsCompleted));
            Assert.All(userLevelProgresses, ulp => Assert.Equal(userId, ulp.UserId));
        }
    }

}
