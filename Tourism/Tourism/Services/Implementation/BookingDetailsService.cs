using Tourism.Entities;
using Tourism.Repositories.Interface;
using Tourism.Services.Interface;

namespace Tourism.Services.Implementation
{
    public class BookingDetailsService : IBookingDetailsService
    {
        private readonly IBookingDetailsRepository bookingDetailsRepository;
        public BookingDetailsService(IBookingDetailsRepository bookingDetailsRepository)
        {
            this.bookingDetailsRepository = bookingDetailsRepository;
        }

        public string AddBookingDetails(List<BookingDetails> bookingDetails, string UserEmail, int PkgId)
        {
           return bookingDetailsRepository.AddBookingDetails(bookingDetails,UserEmail, PkgId);
        }

        public string DeleteBookingDetail(int id)
        {
          return bookingDetailsRepository.DeleteBookingDetail(id);
        }

        public List<BookingDetails> GetAllBookingDetails()
        {
            return bookingDetailsRepository.GetAllBookingDetails();
        }

        public List<BookingDetails> GetBookingDetail(int id)
        {
            return bookingDetailsRepository.GetBookingDetail(id);
        }

        public string UpdateBookingDetail(BookingDetails bookingDetail,int id)
        {
            return bookingDetailsRepository.UpdateBookingDetail(bookingDetail,id);
        }
    }
}
