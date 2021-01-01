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
    }
}
