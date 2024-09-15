using back_nobarriers.Models;
using back_nobarriers.Models.Chat;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace back_nobarriers.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public MessageController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("/sendMessage/{senderId}/{recipientName}")]
        public async Task<ActionResult<Message>> PostMessage(string senderId, string recipientName, [FromBody] Message message)
        {
            if (string.IsNullOrEmpty(recipientName))
            {
                return BadRequest("Recipient cannot be empty");
            }
            var recipient = await _userManager.FindByNameAsync(recipientName);
            if (recipient == null)
            {
                return BadRequest("Recipient doesn't exist");
            }
            message.SenderId = senderId;
            message.RecipientId = recipient.Id;
            message.Timestamp = DateTime.UtcNow;
            return CreatedAtAction(nameof(PostMessage), message);
        }
    }
}
