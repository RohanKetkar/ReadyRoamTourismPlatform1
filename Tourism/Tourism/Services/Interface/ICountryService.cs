using Tourism.Entities;

namespace Tourism.Services.Interface
{
    public interface ICountryService
    {
        public string AddCountry(Country country);
        public string DeleteCountry(int id);
        public List<Country> GetAllCountry();
        public string UpdateCountry(Country country,int id);

    }
}
