using Tourism.Context;
using Tourism.Entities;
using Tourism.Repositories.Interface;

namespace Tourism.Repositories.Implementation
{
    public class CountryRepository:ICountryRepository
    {
        private readonly ApplicationDBContext context;

        public CountryRepository(ApplicationDBContext context)
        {
            this.context = context;
        }

        // Add a new country to the database
        public string AddCountry(Country country)
        {
            context.Countries.Add(country);
            context.SaveChanges();
            return "Country "+country.CountryName+" Added Successfully";
        }

        // Delete a country from the database by ID
        public string DeleteCountry(int id)
        {
            // Find the country by ID
            Country country = context.Countries.FirstOrDefault(d => d.Id == id);
            if (country != null)
            {
                context.Countries.Remove(country); // Use the correct object here
                context.SaveChanges();
                return country.CountryName+" Country Removed Successfully";
            }
            return "Country Not Found";
        }

        // Get all countries from the database
        public List<Country> GetAllCountry()
        {
            var countries = context.Countries.ToList();
            return countries;
        }

        // Update an existing country in the database
        public string UpdateCountry(Country country, int id)
        {
            // Find the existing country by ID
            Country existingCountry = context.Countries.FirstOrDefault(d => d.Id == id);
            if (existingCountry != null)
            {
                // Update the properties of the country
                existingCountry.CountryName = country.CountryName; // Update properties as needed
                

                // Save changes to the database
                context.SaveChanges();
                return "Country Updated to "+country.CountryName+" Successfully";
            }

            return "Country Not Found";
        }

    }
}
