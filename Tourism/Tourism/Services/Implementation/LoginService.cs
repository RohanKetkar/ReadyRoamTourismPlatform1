using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Tourism.Entities;
using Tourism.Repositories.Interface;
using Tourism.Services.Interface;

namespace Tourism.Services.Implementation
{
    public class LoginService : ILoginService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;


        public LoginService(IUserRepository userRepository,  IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await _userRepository.LoginAsync(email, password);
            if (user == null)
            {
                throw new Exception("Invalid email or password.");
            }

            return GenerateJwtToken(user);  // Token generation logic
        }

        private string GenerateJwtToken(User user)
        {
            if (user.Role == null)
            {
                user.Role = UserRole.USER;  // Set a default if Role is null
            }

            var claims = new List<Claim>
{
    new Claim(ClaimTypes.Name, user.Email),
    new Claim(ClaimTypes.Role, user.Role.ToString()) // Ensure Role is added
};

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));


            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKey"));
            //var key = new SymmetricSecurityKey(Convert.FromBase64String("j3Ikc3bpOrGElw3sOVzBxA6rDBTtqZkLSXQDZ7VYOz8="));


            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourIssuer",
                audience: "yourAudience",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}
