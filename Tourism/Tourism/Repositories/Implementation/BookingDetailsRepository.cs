using Microsoft.AspNetCore.Http.HttpResults;
using Tourism.Context;
using Tourism.Entities;
using Tourism.Repositories.Interface;

namespace Tourism.Repositories.Implementation
{
    public class BookingDetailsRepository : IBookingDetailsRepository

    {
        private readonly ApplicationDBContext context;
        public BookingDetailsRepository(ApplicationDBContext context)
        {
            this.context = context;
        }

        //public string AddBookingDetail(BookingDetails bookingDetail, string UserEmail, int PkgId)
        //{
        //    User use=context.Users.FirstOrDefault(u=>u.Email== UserEmail);
        //    User abc = context.Users.FirstOrDefault(u => u.Email == UserEmail);
        //    if (use == null) 
        //    {
        //        return "User Not Found";
        //    }

        //    else 
        //    {
        //        bookingDetail.UserId = abc.Id;
        //        bookingDetail.PkgId = PkgId;
        //        context.bookingDetails.Add(bookingDetail);
        //        context.SaveChanges();
        //        return "Booking Detail of "+bookingDetail.Name+" Added Successfully!!"; 
        //    }            
        //}
        public string AddBookingDetails(List<BookingDetails> bookingDetails, string UserEmail, int PkgId)
        {
            Console.WriteLine(UserEmail);
            Console.WriteLine(bookingDetails);
            
            User user = context.Users.FirstOrDefault(u => u.Email == UserEmail);
            if (user == null)
            {
                return "User Not Found";
            }
            foreach (var bookingDetail in bookingDetails)
            {
                bookingDetail.UserId = user.Id;
                bookingDetail.PkgId = PkgId;
                context.bookingDetails.Add(bookingDetail);
            }
            context.SaveChanges();
            return "Booking Details Added Successfully!";
        }

        public string DeleteBookingDetail(int id)
        {
           BookingDetails bd = context.bookingDetails.FirstOrDefault(b=>b.Id == id);
            if (bd != null)
            {
                context.bookingDetails.Remove(bd);
                context.SaveChanges();
                return bd.Name+" Booking Detail Removed Successfully!!";
            }
            return "Faild To Remove Booking Detail With ID : " + id;
        }

        public List<BookingDetails> GetAllBookingDetails()
        {
            return context.bookingDetails.ToList();
        }

        public List<BookingDetails> GetBookingDetail(int id)
        {
            return context.bookingDetails.Where(b => b.UserId == id).ToList();
        }

        public string UpdateBookingDetail(BookingDetails Detail, int id)
        {

            BookingDetails bookingDetail = context.bookingDetails.FirstOrDefault(b=>b.Id==id);
            if (bookingDetail != null)
            {
               // bookingDetail.Email= Detail.Email;
                bookingDetail.Name = Detail.Name;
                bookingDetail.Address = Detail.Address;
                bookingDetail.Age = Detail.Age;
                bookingDetail.AddharNo= Detail.AddharNo;
                bookingDetail.PassportNo = Detail.PassportNo;
                context.SaveChanges();
                return "Booking Details Updated With Name : " + Detail.Name;
            }
            return "Faild To Update Booking Details!!";
        }
    }
}
