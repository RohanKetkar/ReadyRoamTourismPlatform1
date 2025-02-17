using Microsoft.AspNetCore.Mvc;
using Tourism.Entities;
using Tourism.Services.Interface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IStateService stateServ;
        public StateController(IStateService stateServ)
        {
            this.stateServ = stateServ;
        }

        // GET: api/<StateController>
        [HttpGet]
        public List<State> Get()
        {
            return stateServ.GetAllState();
        }

        // GET api/<StateController>/5
        [HttpGet("{countryId}")]
        public List<State> Get(int countryId)
        {
            return stateServ.GetAllStates(countryId);
        }

        // POST api/<StateController>
        [HttpPost("{Countryid}")]
        public string Post([FromBody] State state ,int Countryid)
        {
            return stateServ.AddStateWithCountryId(state ,Countryid);
        }

        // PUT api/<StateController>/5
        [HttpPut("{Stateid}")]
        public string Put(int Stateid, [FromBody] State state)
        {
            return stateServ.updateState(state,Stateid);
        }

        // DELETE api/<StateController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return stateServ.deleteStateById(id);
        }
    }
}
