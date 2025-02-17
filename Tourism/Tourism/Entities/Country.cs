using System.Text.Json.Serialization;

namespace Tourism.Entities
{
    public class Country:BaseEntity
    {
        public string CountryName { get; set; }
        [JsonIgnore]
      public   List<State>? states { get; set; } = [];
 
    }
}
