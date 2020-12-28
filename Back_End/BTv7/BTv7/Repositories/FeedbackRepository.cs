using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class FeedbackRepository : Repository<Feedback>
    {
        public List<Feedback> GetFeedbackByCustomerID(int cid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid).ToList();
        }
    }
}