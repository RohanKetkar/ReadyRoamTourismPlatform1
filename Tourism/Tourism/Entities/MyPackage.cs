using System.Text.Json.Serialization;

namespace Tourism.Entities
{
    public class MyPackage : BaseEntity
    {
        public string nameOfPackage { get; set; }
        public double price { get; set; }
        public string duration { get; set; }
        public string tagline { get; set; }
        public string smallDescription { get; set; }
        public string longDescription { get; set; }
        public string image {  get; set; }
        [JsonIgnore]
        public List<BookingDetails>? bookingDetails { get; set; } = [];
        public int? StateId { get; set; }
        [JsonIgnore]
        public State? state { get; set; }

    }
}
