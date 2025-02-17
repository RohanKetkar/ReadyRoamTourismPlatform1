using System.Text.Json.Serialization;
using System.Collections.Generic;

namespace Tourism.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        // Nullable UserRole property
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserRole? Role { get; set; }

        // Constructor to set default Role to USER if not provided
        public User()
        {
            // Default value for Role is USER if it's not provided
            //if (Role != null)
            //{
            //    Role = UserRole.ADMIN;

            //}
            if (Role == null)
            {
                Role = UserRole.USER;
            }

        }

        [JsonIgnore]
        public List<BookingDetails>? bookingDetails { get; set; } = new List<BookingDetails>();
    }

    public enum UserRole
    {
        ADMIN,
        USER
    }
}
