using Tourism.Entities;

namespace Tourism.Repositories.Interface
{
    public interface IBookingDetailsRepository
    {
        //public string AddBookingDetail(BookingDetails bookingDetail, string UserEmail, int PkgId);
        public string AddBookingDetails(List<BookingDetails> bookingDetails, string UserEmail, int PkgId);
        public string DeleteBookingDetail(int id);
        public string UpdateBookingDetail(BookingDetails bookingDetail,int id);
        public List<BookingDetails> GetAllBookingDetails();
        public List<BookingDetails> GetBookingDetail(int id);

    }
}
