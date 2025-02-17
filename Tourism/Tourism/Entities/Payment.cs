using System.Xml.Linq;

namespace Tourism.Entities
{
    public class Payment:BaseEntity 
    {       
    public string nameOfPackage;
      
    public double price;

    public string email;

    public double priceperperson;

    public int PeopleCount;

    public int PkgId;

    public long TID;
    }
}
