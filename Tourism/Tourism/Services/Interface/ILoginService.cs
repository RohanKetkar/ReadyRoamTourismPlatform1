namespace Tourism.Services.Interface
{
    public interface ILoginService
    {
        Task<string> LoginAsync(string email, string password);
    }
}
