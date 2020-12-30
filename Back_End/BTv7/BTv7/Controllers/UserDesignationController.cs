using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/designations")]
    public class UserDesignationController : ApiController
    {
        UserDesignationRepository designDB = new UserDesignationRepository();

        [Route("", Name = "GetDesignations")]
        [BasicAuthentication]
        public IHttpActionResult GetDesignations()
        {

            var designFromDB = designDB.GetAll();

            if (designFromDB != null || designFromDB.Count != 0)
            {
                return Ok(designFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }
    }
}
