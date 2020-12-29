using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/carts"), BasicAuthentication]
    public class OrderCartsController : ApiController
    {

    }
}
