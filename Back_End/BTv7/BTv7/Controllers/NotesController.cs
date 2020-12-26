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
    [RoutePrefix("api/notes")]
    public class NotesController : ApiController
    {
        NoteRepository noterepo = new NoteRepository();
        [Route("", Name = "GetAllNotes")]
        //[BasicAuthentication]
        public IHttpActionResult Get()
        {
            var notesFromDB = noterepo.GetAll();
            if (notesFromDB != null)
            {
                return Ok(notesFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("", Name = "CreateNote")]
        //[BasicAuthentication]
        public IHttpActionResult Post(Note note)
        {
            noterepo.Insert(note);
            return Created("api/notes/" + note.ID, note);
        }
    }
}
