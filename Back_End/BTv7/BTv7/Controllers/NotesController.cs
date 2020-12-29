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
        
        [Route("", Name = "GetAllNotes")]
        [BasicAuthentication]
        public IHttpActionResult Get()
        {
            NoteRepository noterepo = new NoteRepository();
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
            NoteRepository noterepo = new NoteRepository();
            note.ID = note.ID;
            note.Date = DateTime.Now;
            noterepo.Insert(note);
            return Created("api/notes/" + note.ID, note);
        }

        [Route("{id}", Name = "GetNoteByID")]
        [BasicAuthentication]
        public IHttpActionResult Get(int id)
        {
            NoteRepository noterepo = new NoteRepository();
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

        [Route("{uid}/{eid}", Name = "GetNoteByEmpID")]
        [BasicAuthentication]
        public IHttpActionResult GetUser([FromUri]int eid,[FromUri]int uid)
        {
            NoteRepository noterepo = new NoteRepository();
            var noteFromDB = noterepo.GetNoteByEmpID(eid);
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
            NoteRepository noterepo = new NoteRepository();
            note.ID = id;
            noterepo.Update(note);
            return Ok(note);
        }

        [Route("{id}", Name = "DeleteNote")]
        [BasicAuthentication]
        public IHttpActionResult Delete(int id)
        {
            NoteRepository noterepo = new NoteRepository();
            noterepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
        }

    }
}
