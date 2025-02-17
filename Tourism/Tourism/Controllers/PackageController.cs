using Microsoft.AspNetCore.Mvc;
using Tourism.Entities;
using Tourism.Services.Interface;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tourism.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {
        private readonly IPackageService packageService;
        public PackageController(IPackageService packageService)
        {
            this.packageService = packageService;
        }


        [HttpGet]
        public List<MyPackage> Get()
        {
            return packageService.getPackages();
        }

        // GET api/<PackageController>/5
        [HttpGet("{id}")]
        public List<MyPackage> Get(int id)
        {
            return packageService.GetPackageByStateId(id);
        }
        [HttpGet("Package/{Pkgid}")]
        public MyPackage GetPackage(int Pkgid)
        {
            return packageService.getPackage(Pkgid);
        }



        // POST api/<PackageController>
        [HttpPost("{StateId}")]
        public string Post([FromBody] MyPackage value,int StateId)
        {
            Console.WriteLine((value));
            return packageService.addPackage(value,StateId);
        }

        // PUT api/<PackageController>/5
        [HttpPut("{pkgId}")]
        public string Put(int pkgId, [FromBody] MyPackage package)
        {
          
            return packageService.updatePackage(package, pkgId);
        }

        // DELETE api/<PackageController>/5
        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return packageService.deletePackage(id);
        }
    }
}
