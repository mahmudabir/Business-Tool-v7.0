using BTv7.Models;
using BTv7.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/vendors")]
    public class VendorsController : ApiController
    {
        private VendorRepository vendorDB = new VendorRepository();

        [Route("", Name = "GetVendors")]
        [BasicAuthentication]
        public IHttpActionResult GetVendors()
        {
            var vendorFromDB = vendorDB.GetAll();
            if (vendorFromDB.Count != 0)
            {
                return Ok(vendorFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("name/{name}", Name = "GetVendorsByName")]
        [BasicAuthentication]
        public IHttpActionResult GetVendorsByName(string name)
        {
            var vendorFromDB = vendorDB.GetByName(name);

            if (vendorFromDB != null || vendorFromDB.Count != 0)
            {
                return Ok(vendorFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("id/{id}", Name = "GetVendorsByID")]
        [BasicAuthentication]
        public IHttpActionResult GetVendorsByID(int id)
        {
            var vendorFromDB = vendorDB.GetVendorByID(id);

            if (vendorFromDB != null || vendorFromDB.Count != 0)
            {
                return Ok(vendorFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }
    }
}
