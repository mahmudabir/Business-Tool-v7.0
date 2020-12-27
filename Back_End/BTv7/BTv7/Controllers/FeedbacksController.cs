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
    [RoutePrefix("api/feedbacks"), BasicAuthentication]
    public class FeedbacksController : ApiController
    {
        private FeedbackRepository feedbackDB = new FeedbackRepository();


        [Route(""), Authorize(Roles = "ADMIN,CUSTOMER,MANAGER")]
        public IHttpActionResult Get()
        {
            var result = feedbackDB.GetAll();
            if (result.Count != 0)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }










    }
}
