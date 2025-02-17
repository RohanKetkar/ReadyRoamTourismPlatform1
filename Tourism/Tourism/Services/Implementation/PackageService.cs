using Tourism.Entities;
using Tourism.Repositories.Interface;
using Tourism.Services.Interface;

namespace Tourism.Services.Implementation
{
    public class PackageService : IPackageService
    {
        private readonly IPackageRepository repository;
        public PackageService(IPackageRepository repository)
        {
            this.repository = repository;
        }
        public string addPackage(MyPackage package, int StateId)
        {
            return repository.addPackage(package,StateId);
        }

        public string deletePackage(int id)
        {
            return repository.deletePackage(id);
        }

        public string updatePackage(MyPackage package,int pkgId)
        {
            return repository.updatePackage(package, pkgId);
        }

        public List<MyPackage> getPackages()
        {
            return repository.getPackages();
        }
        public MyPackage getPackage(int PkgId)
        {
            return repository.getPackage(PkgId);
        }
        public List<MyPackage> GetPackageByStateId(int stateid)
        
            {
                return repository.GetPackageByStateId(stateid);
            }
        
    }
}

