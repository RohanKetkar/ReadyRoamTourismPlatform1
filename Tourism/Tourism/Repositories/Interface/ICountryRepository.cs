using Tourism.Entities;

namespace Tourism.Repositories.Interface
{
    public interface ICountryRepository
    {
        public string AddCountry(Country country);
        public string DeleteCountry(int id);
        public string UpdateCountry(Country country, int id);
        public List<Country> GetAllCountry();
    }

}
