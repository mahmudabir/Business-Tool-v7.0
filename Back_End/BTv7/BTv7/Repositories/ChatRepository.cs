using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class ChatRepository : Repository<Chat>
    {

        public Chat GetChatBySenderReceiver(int sid,int rid)
        {
            List<Chat> chatFromDB = this.GetAll();
            return chatFromDB.FirstOrDefault(x => x.SenderID.Equals(sid) && x.ReceiverID.Equals(rid) || x.SenderID.Equals(rid) && x.ReceiverID.Equals(sid));
        }
    }
}