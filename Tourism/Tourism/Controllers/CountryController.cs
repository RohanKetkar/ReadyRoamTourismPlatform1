using System.Diagnostics.Metrics;
using Microsoft.AspNetCore.Mvc;
using Tourism.Entities;
using Tourism.Services.Interface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService countryService;
        public CountryController(ICountryService countryService)
        {
            this.countryService = countryService;
        }

        // GET: api/<CountryController>
        [HttpGet]
        public List<Country> Get()
        {
            return countryService.GetAllCountry();
        }

        // GET api/<CountryController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CountryController>
        [HttpPost]
        public string Post([FromBody] Country country)
        {
            return countryService.AddCountry(country);
        }

        // PUT api/<CountryController>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] Country country)
        {
            return countryService.UpdateCountry(country,id);
        }

        // DELETE api/<CountryController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return countryService.DeleteCountry(id);
        }
    }
}
