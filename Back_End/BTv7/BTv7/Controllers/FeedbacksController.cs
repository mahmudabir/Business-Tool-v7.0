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


        [Route("", Name = "GetFeedbacks"), Authorize(Roles = "ADMIN,MANAGER")]
        public IHttpActionResult Get()
        {
            var feedbackFromDB = feedbackDB.GetAll();
            if (feedbackFromDB.Count != 0)
            {
                return Ok(feedbackFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }


        [Route("{id}", Name = "GetFeedbackByID"), Authorize(Roles = "ADMIN,CUSTOMER,MANAGER")]
        public IHttpActionResult Get(int id)
        {
            var feedbackFromDB = feedbackDB.Get(id);
            if (feedbackFromDB != null)
            {
                var result = feedbackFromDB.AddLinks(
                    new HyperMedia { Href = Url.Link("GetFeedbacks", null), Method = "GET", Rel = "Get all feedbacks." },
                    new HyperMedia { Href = Url.Link("GetFeedbackByID", new { id = id }), Method = "GET", Rel = "Get one feedback by ID." },
                    new HyperMedia { Href = Url.Link("PostFeedback", new { id = id }), Method = "GET", Rel = "Post feedback." }
                    );
                return Ok(result);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }


        [Route("", Name = "PostFeedback"), Authorize(Roles = "CUSTOMER")]
        public IHttpActionResult Post(Feedback feedback)
        {
            if (ModelState.IsValid)
            {
                feedbackDB.Insert(feedback);
                var uri = Url.Link("GetFeedbackByID", new { id = feedback.ID });
                return Created(uri, feedback);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }










    }
}
