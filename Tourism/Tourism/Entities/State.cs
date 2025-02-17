using System.Text.Json.Serialization;

namespace Tourism.Entities
{
    public class State:BaseEntity
    {
        public string StateName { get; set; }
        public int CountryId { get; set; }
        [JsonIgnore]
        public  List<MyPackage> myPackages { get; set; } = [];
        [JsonIgnore]
        public Country? Country { get; set; }
    }
}
