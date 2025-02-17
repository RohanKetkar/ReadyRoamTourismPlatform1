using Microsoft.EntityFrameworkCore;
using Tourism.Context;
using Tourism.Entities;
using Tourism.Repositories.Interface;

namespace Tourism.Repositories.Implementation
{
       
    public class PaymentRepository : IPaymentRepository
    {
        private readonly ApplicationDBContext _context;

        public PaymentRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public  string AddPayment(Payment Pay)
        {
             _context.Payments.Add(Pay);
             _context.SaveChanges();

            return "Payment Done successfully.";
        }
    }
}
