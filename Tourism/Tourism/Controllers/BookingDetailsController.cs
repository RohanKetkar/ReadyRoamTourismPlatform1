using Microsoft.AspNetCore.Mvc;
using Tourism.Entities;
using Tourism.Services.Interface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BookingDetailsController : ControllerBase
    {
        private readonly IBookingDetailsService bookingDetailsService;
        public BookingDetailsController(IBookingDetailsService bookingDetailsService)
        {
            this.bookingDetailsService = bookingDetailsService;
        }

        // GET: api/<BookingDetailsController>
        [HttpGet]
        public List<BookingDetails> Get()
        {
            return bookingDetailsService.GetAllBookingDetails();
        }

        // GET api/<BookingDetailsController>/5
        [HttpGet("{UserId}")]
        public List<BookingDetails> Get(int UserId)
        {
            return bookingDetailsService.GetBookingDetail(UserId);
        }

        // POST api/<BookingDetailsController>
        [HttpPost("{UserEmail}/{PkgId}")]
        public string Post([FromBody] List<BookingDetails> details,string UserEmail,int PkgId)
        {
            Console.WriteLine("hiiii");
            Console.WriteLine(details.ToString());
            Console.WriteLine(UserEmail);
            return bookingDetailsService.AddBookingDetails(details, UserEmail, PkgId);
        }

        // PUT api/<BookingDetailsController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] BookingDetails details)
        {
            return bookingDetailsService.UpdateBookingDetail(details,id);
        }

        // DELETE api/<BookingDetailsController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return bookingDetailsService.DeleteBookingDetail(id);
        }
    }
}
