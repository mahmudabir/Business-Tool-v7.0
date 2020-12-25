using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/logins")]
    public class LoginsController : ApiController
    {
        LoginRepository loginDB = new LoginRepository();

        [Route("{id}", Name = "GetUserByID"), BasicAuthentication]
        [Authorize(Roles = "MANAGER, ADMIN")]
        public IHttpActionResult Get(int id)
        {
            var authOrNot = Thread.CurrentPrincipal.Identity.IsAuthenticated;
            var authUsername = Thread.CurrentPrincipal.Identity.Name.ToString();
            var authUserRole = Thread.CurrentPrincipal.IsInRole(null);
            var authInstanceType = Thread.CurrentPrincipal.GetType();
            var authType = Thread.CurrentPrincipal.Identity.AuthenticationType;




            var result = loginDB.Get(id).AddLinks(
                new HyperMedia
                {
                    Rel = "Get one user by ID 1",
                    Href = Url.Link("GetUserByID", new { id = id }),
                    Method = "GET 1"
                },
                new HyperMedia
                {
                    Rel = "Get one user by ID 2",
                    Href = Url.Link("GetUserByID", new { id = id }),
                    Method = "GET 1"
                },
                new HyperMedia
                {
                    Rel = "Get one user by ID 3",
                    Href = Url.Link("GetUserByID", new { id = id }),
                    Method = "GET 1"
                }
                );



            return Ok(result);
        }
    }
}
