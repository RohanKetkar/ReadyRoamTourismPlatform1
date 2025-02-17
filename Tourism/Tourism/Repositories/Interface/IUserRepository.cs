using Tourism.Entities;

namespace Tourism.Repositories.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAsync(string email);
        Task<string> RegisterAsync(User user);
        Task<User> LoginAsync(string email, string password);
       public  Task<string> UpdateAsync(User user, int id);
        Task DeleteAsync(int id);
    }
}
