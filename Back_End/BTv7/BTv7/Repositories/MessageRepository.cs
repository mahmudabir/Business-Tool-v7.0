using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class MessageRepository : Repository<Message>
    {
        
         public List<Message> GetMessageByChatId(int cid)
        {
             
            return this.context.Set<Message>().Where(x => x.ChatID==cid).ToList();
        }
    }
}