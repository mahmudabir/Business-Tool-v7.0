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
            var notices = noticerepo.GetAll();
            if (notices.Count() != 0)
            {
                return Ok(notices);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
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
    }
}
