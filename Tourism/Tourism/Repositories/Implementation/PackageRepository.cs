using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Tourism.Context;
using Tourism.Entities;
using Tourism.Repositories.Interface;

namespace Tourism.Repositories.Implementation
{
    public class PackageRepository : IPackageRepository
    {
        private readonly ApplicationDBContext dbContext;
        public PackageRepository(ApplicationDBContext dBContext)
        {
            this.dbContext = dBContext;
        }
        public string addPackage(MyPackage package, int StateId)
        {
            var state = dbContext.States.Find(StateId);


            if (state == null)
            {
                return "State Not Found";
            }


            var existingPkg = dbContext.packages
                                        .FirstOrDefault(s => s.StateId == StateId && s.nameOfPackage == package.nameOfPackage);

            if (existingPkg != null)
            {
                return "Package already exists for this State";
            }
            package.StateId = StateId;
            dbContext.packages.Add(package);

            dbContext.SaveChanges();

            return "Package " +package.nameOfPackage + " is added";
        }
        public string deletePackage(int id)
        {
            MyPackage package = dbContext.packages.FirstOrDefault(p => p.Id == id);
            if (package != null)
            {
                dbContext.packages.Remove(package);
                dbContext.SaveChanges();
                return "Package deleted successfully";

            }
            return "Package not found";
        }

        public string updatePackage(MyPackage package,int pkgId)
        {
            MyPackage existingPackage = dbContext.packages.FirstOrDefault(p => p.Id == pkgId);
            if (existingPackage != null)
            {
                existingPackage.nameOfPackage = package.nameOfPackage;
                existingPackage.price = package.price;
                existingPackage.duration = package.duration;
                existingPackage.tagline = package.tagline;
                existingPackage.smallDescription = package.smallDescription;
                existingPackage.longDescription = package.longDescription;
                existingPackage.image = package.image;
                

                dbContext.SaveChanges();
                return "Package updated successfully";
            }
            return "Package not found";
        }
        public List<MyPackage> getPackages()
        {
            var allPackages = dbContext.packages.ToList();
            return allPackages;
        }

        public MyPackage getPackage(int Pkgid)
        {
            MyPackage package = dbContext.packages.FirstOrDefault(p => p.Id == Pkgid);
            return package;
        }

        public List<MyPackage> GetPackageByStateId(int stateid)
        {
            var State = dbContext.States.Find(stateid);
            List<MyPackage> packages = dbContext.packages.Where(p => p.StateId == stateid).ToList();

            return packages;
        }
    }
}
