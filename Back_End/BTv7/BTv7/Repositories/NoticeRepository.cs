using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class NoticeRepository : Repository<Notice>
    {
        public void UpdateNoticeDetails(Notice n)
        {
            using (var notice = new BTv7DbContext())
            {
                int noOfNoticeRowAffected = notice.Database.ExecuteSqlCommand("UPDATE Notices SET Subject = '" + n.Subject + "', Description = '" + n.Description + "', EmployeeID = '" + n.EmployeeID + "', PostDate = '" + n.PostDate + "' WHERE ID = " + n.ID + ";");
            }
        }

        public List<Notice> GetBySubject(string id)
        {
            return this.context.Set<Notice>().Where(x => x.Subject.ToLower().Contains(id.ToLower())).ToList();
        }
    }
}