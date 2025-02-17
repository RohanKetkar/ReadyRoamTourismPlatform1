using Tourism.Entities;

namespace Tourism.Repositories.Interface
{
    public interface IPackageRepository
    {
        public string addPackage(MyPackage package, int StateId);
        public string deletePackage(int id);
        public string updatePackage(MyPackage package,int pkgId);
        public List<MyPackage> getPackages();
        public MyPackage getPackage(int PkgId);
        public List<MyPackage> GetPackageByStateId(int stateid);

    }
}
