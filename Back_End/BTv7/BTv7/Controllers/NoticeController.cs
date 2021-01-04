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
    [RoutePrefix("api/notices")]
    public class NoticeController : ApiController
    {
        NoticeRepository noticerepo = new NoticeRepository();
        [Route("", Name = "GetAllNotices")]
        [BasicAuthentication]
        public IHttpActionResult Get()
        {
            var notices = noticerepo.GetAll().OrderByDescending(s => s.PostDate);
            if (notices.Count() != 0)
            {
                return Ok(notices);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("create", Name = "CreateNotice")]
        [BasicAuthentication]
        public IHttpActionResult PostNotice(Notice notice)
        {
            notice.PostDate = DateTime.Now;
            if (ModelState.IsValid)
            {
                noticerepo.Insert(notice);
                return Ok();
            }
            
            else
            {
                return BadRequest("Invalid data.");
            }
            
           
        }

        [Route("id/{id}", Name = "GetNoticeByID")]
        [BasicAuthentication]
        public IHttpActionResult GetNoticeByID(int id)
        {
            var notice = noticerepo.Get(id);

            if (notice != null)
            {
                return Ok(notice);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("id/{id}", Name = "PutNoticeByID")]
        [BasicAuthentication]
        public IHttpActionResult PutNoticeByID([FromUri] int id, [FromBody] Notice notice)
        {
            var com = noticerepo.Get(id);
            notice.ID = id;
            notice.PostDate = DateTime.Now;
            noticerepo.UpdateNoticeDetails(notice);

            return Ok(notice);
        }

        [Route("delete/id/{id}", Name = "DeleteNoticeByID")]
        [BasicAuthentication]
        public IHttpActionResult DeleteNoticeByID([FromUri] int id)
        {
            noticerepo.Delete(id);

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("subject/{subject}", Name = "GetBySubject")]
        [BasicAuthentication]
        public IHttpActionResult GetBySubject(string subject)
        {
            var notice= noticerepo.GetBySubject(subject);

            if (notice != null || notice.Count != 0)
            {
                return Ok(notice);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }
    }
}
