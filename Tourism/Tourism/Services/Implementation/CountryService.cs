using Tourism.Entities;
using Tourism.Repositories.Interface;
using Tourism.Services.Interface;

namespace Tourism.Services.Implementation
{
    public class CountryService:ICountryService
    {
        private readonly ICountryRepository _ctrRepo;  // Correct naming for the field

        // Constructor that accepts ICountryRepository dependency
        public CountryService(ICountryRepository ctrRepo)
        {
            _ctrRepo = ctrRepo;  // Proper assignment to the field
        }

        // Add a new country
        public string AddCountry(Country country)
        {
            return _ctrRepo.AddCountry(country);  // Call repository method
        }

        // Delete a country by ID
        public string DeleteCountry(int id)
        {
            return _ctrRepo.DeleteCountry(id);  // Call repository method
        }

        // Get all countries
        public List<Country> GetAllCountry()
        {
            return _ctrRepo.GetAllCountry();  // Call repository method
        }

        // Update a country
        public string UpdateCountry(Country country, int id)
        {
            return _ctrRepo.UpdateCountry(country,id);  // Call repository method
        }

    }
}
