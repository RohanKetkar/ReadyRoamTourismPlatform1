using Tourism.Entities;
using Tourism.Repositories.Implementation;
using Tourism.Repositories.Interface;
using Tourism.Services.Interface;

namespace Tourism.Services.Implementation
{
    public class PaymentService:IPaymentService
    {
        private readonly IPaymentRepository _paymentrepository;


        public PaymentService(IPaymentRepository paymentrepository)
        {
            _paymentrepository = paymentrepository;
        }

        public string AddPayment(Payment Pay)
        {
            string mesage = _paymentrepository.AddPayment(Pay);
            return mesage;
        }
    }
}
