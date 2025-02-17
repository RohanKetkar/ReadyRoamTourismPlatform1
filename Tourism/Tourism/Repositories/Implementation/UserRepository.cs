using System;
using Microsoft.EntityFrameworkCore;
using Tourism.Context;
using Tourism.Entities;
using Tourism.Repositories.Interface;

namespace Tourism.Repositories.Implementation
{
    public class UserRepository:IUserRepository
    {
        private readonly ApplicationDBContext _context;

        public UserRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users
                                 .Where(u => u.Role == UserRole.USER)  
                                 .Include(u => u.bookingDetails)      
                                 .ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.Include(u => u.bookingDetails).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<string> RegisterAsync(User user)
        {
            // Check if a user with the same email already exists
            var existingUser = await _context.Users
                                             .FirstOrDefaultAsync(u => u.Email == user.Email);

            // If the user with the same email exists, return a message
            if (existingUser != null)
            {
                return "A user with the same email already exists.";
            }

            // If no user exists with the same email, add the new user
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return "User registered successfully.";
        }
       
        public async Task<User> LoginAsync(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        public async Task<string> UpdateAsync(User user,int id)
        {
            var use=_context.Users.FirstOrDefault(user=>user.Id == id);
            if (use != null)
            {
                use.FirstName = user.FirstName;
                use.LastName = user.LastName;
                use.Email = user.Email;
                use.Password = user.Password;
                use.Role = user.Role;
                use.updatedOn= DateTime.Now;

                //_context.Users.Update(user);
                await _context.SaveChangesAsync();
            }
            return "User Not Found";
        }

        public async Task DeleteAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

    }
}
