using Tourism.Entities;

namespace Tourism.Services.Interface
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task<string> UpdateUserAsync(User user,int id);
        Task<string> RegisterAsync(User user);
       
        Task DeleteUserAsync(int id);
    }
}
