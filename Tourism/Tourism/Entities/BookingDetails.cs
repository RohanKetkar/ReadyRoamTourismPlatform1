using System.Text.Json.Serialization;

namespace Tourism.Entities
{
    public class BookingDetails:BaseEntity
    {
        public int PkgId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set;}
        //public string Email { get; set; }
        public string Address { get; set; }
        public int Age {  get; set; }
        public string AddharNo { get; set; }
        public string PassportNo { get; set; }
        public string ContactNo { get; set; }
        [JsonIgnore]
        public User? user { get; set; }
        [JsonIgnore]
        public MyPackage? myPackage { get; set; }

    }
}
