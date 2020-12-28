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
        [BasicAuthentication]
        public IHttpActionResult Get()
        {
            var notesFromDB = noterepo.GetAll();
            if (notesFromDB.Count() != 0)
            {
                return Ok(notesFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("", Name = "CreateNote")]
        [BasicAuthentication]
        public IHttpActionResult Post(Note note)
        {
            noterepo.Insert(note);
            return Created("api/notes/" + note.ID, note);
        }

        [Route("{id}", Name = "GetNoteByID")]
        [BasicAuthentication]
        public IHttpActionResult Get(int id)
        {
            var noteFromDB=noterepo.Get(id);
            if (noteFromDB != null)
            {
                return Ok(noteFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }

        }

        [Route("{id}", Name = "UpdateNote")]
        [BasicAuthentication]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Note note)
        {
            note.ID = id;
            noterepo.Update(note);
            return Ok(note);
        }

        [Route("{id}", Name = "DeleteNote")]
        [BasicAuthentication]
        public IHttpActionResult Delete(int id)
        {
            noterepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
