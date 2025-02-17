using Tourism.Entities;
using Tourism.Repositories.Interface;
using Tourism.Services.Interface;

namespace Tourism.Services.Implementation
{
    public class StateService : IStateService
    {
        private readonly IStateRepository _staterepository;


        public StateService(IStateRepository staterepository)
        {
            _staterepository = staterepository;
        }


        public List<State> GetAllState()
        {

            List<State> state = _staterepository.GetAllState();
            return state;

        }
        public string AddStateWithCountryId(State state, int countryid)
        {

            string mesage = _staterepository.AddStateWithCountryId(state, countryid);
            return mesage;
        }
        public string updateState(State state, int stateid)
        {
            return _staterepository.updateState(state, stateid);
        }

        public string deleteStateById(int id)
        {
           return _staterepository.deleteStateById(id);
        }

        public List<State> GetAllStates(int countryId)
        {
            return _staterepository.GetAllStates(countryId);
        }
    }
}
