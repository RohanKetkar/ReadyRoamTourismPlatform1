using Microsoft.EntityFrameworkCore;
using Tourism.Entities;

namespace Tourism.Repositories.Interface
{
    public interface IStateRepository
    {
        public List<State> GetAllState();
        public string AddStateWithCountryId(State state, int countryid);
        public string updateState(State state, int stateid);
        public string deleteStateById(int id);
        public List<State> GetAllStates(int countryId);
       

    }
}
