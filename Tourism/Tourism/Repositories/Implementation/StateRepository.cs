using Tourism.Context;
using Tourism.Entities;
using Tourism.Repositories.Interface;

namespace Tourism.Repositories.Implementation
{
    public class StateRepository:IStateRepository
    {
        private readonly ApplicationDBContext _context;
        public StateRepository(ApplicationDBContext context)
        {

            _context = context;
        }
        public List<State> GetAllState()
        {

            List<State> state = _context.States.ToList();

            if (state == null)
            {
                Console.WriteLine("state");
                return null;
            }


            return _context.States.ToList();

        }

        public string AddStateWithCountryId(State state, int countryid)
        {
        
            var country = _context.Countries.Find(countryid);

        
            if (country == null)
            {
                return "Country Not Found";
            }
            var existingState = _context.States
                                        .FirstOrDefault(s => s.CountryId == countryid && s.StateName == state.StateName);

            if (existingState != null)
            {
                return "State already exists for this country";
            }
            var State1 = _context.States.FirstOrDefault(c => c.StateName == state.StateName);
            if (State1 != null)
            {
                return  State1.StateName+" is already exist";
            }

            state.CountryId = countryid;

            _context.States.Add(state);

            _context.SaveChanges();

            return "State "+state.StateName+" is added";
        }

        public string updateState(State state, int stateid)
        {

            var State = _context.States.FirstOrDefault(c => c.Id == stateid);
            if (State == null)
            {
                return "state is not is present";
            }

            if (State != null)
            {
                State.StateName = state.StateName;
                //State.CountryId = state.CountryId;
                _context.SaveChanges();
            }

            return "Successfuly Updated To "+state.StateName;
        }

        public string deleteStateById(int id)
        {
            var State = _context.States.Find(id);
            Console.WriteLine(State.StateName);
            if (State != null)
            {
                _context.States.Remove(State);
                _context.SaveChanges();
                return State.StateName+" Deleted Successfuly";
            }
            return "State Not Found";
        }


        public List<State> GetAllStates(int countryId)
        {
            
            List<State> states = _context.States
                                         .Where(c => c.CountryId == countryId) 
                                         .ToList(); 

            return states; 
        }

    }
}
