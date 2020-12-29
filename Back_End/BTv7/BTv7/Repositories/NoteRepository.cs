using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class NoteRepository : Repository<Note>
    {
        
        public List<Note> GetNoteByEmpID(int id)
        {

            return this.context.Set<Note>().Where(x => x.EmployeeID == id).OrderByDescending(x=>x.Date).ToList();
        }
    }
}