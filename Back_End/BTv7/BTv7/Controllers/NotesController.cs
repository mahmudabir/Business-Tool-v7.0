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
            EmployeeRepository emprepo = new EmployeeRepository();
            var UserFromDB = emprepo.GetAll();
            if (UserFromDB.Count() != 0)
            {
                return Ok(UserFromDB);
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
            note.Subject = note.Subject;
            note.Description = note.Description;
            note.EmployeeID = note.EmployeeID;
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
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("{uid}/{eid}", Name = "GetNoteByEmpID")]
        [BasicAuthentication]
        public IHttpActionResult GetUser([FromUri]int eid,[FromUri]int uid)
        {
            NoteRepository noterepo = new NoteRepository();
            var noteFromDB = noterepo.GetNoteByEmpID(eid);
            if (noteFromDB.Count()!= 0)
            {
                return Ok(noteFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }


        [Route("{id}", Name = "UpdateNote")]
        [BasicAuthentication]
        public IHttpActionResult Put([FromUri] int id, [FromBody] Note note)
        {
            NoteRepository noterepo = new NoteRepository();
            note.ID = id;
            note.Date = DateTime.Now;
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
