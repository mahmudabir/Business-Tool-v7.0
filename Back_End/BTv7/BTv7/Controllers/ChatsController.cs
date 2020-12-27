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
    [RoutePrefix("api/chats")]
    public class ChatsController : ApiController
    {
        [Route("{id}", Name = "GetUser")]
        [BasicAuthentication]
        public IHttpActionResult Get(string id)
        {
            LoginRepository loginrepo = new LoginRepository();
            var user=loginrepo.GetUserByUsername(id);
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("", Name = "GetAllUser")]
        [BasicAuthentication]
        public IHttpActionResult GetAll()
        {
            ChatRepository chatrepo = new ChatRepository();
            var chatList = chatrepo.GetAll();
            if (chatList.Count() != 0)
            {
                return Ok(chatList);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("{sid}/{rid}", Name = "GetChat")]
        [BasicAuthentication]
        public IHttpActionResult Get(int sid,int rid)
        {
            ChatRepository chatrepo = new ChatRepository();
            var chatFromSender = chatrepo.GetChatBySenderReceiver(sid, rid);
            
            if (chatFromSender != null)
            {
                MessageRepository msgrepo = new MessageRepository();
                var msgList=msgrepo.GetMessageByChatId(chatFromSender.ID);
                if (msgList.Count()>0)
                {
                    return Ok(msgList);
                }
                else
                {
                    return Created("",chatFromSender);
                }
               

            }
            else
            {
                Chat chat = new Chat();
                chat.SenderID = sid;
                chat.ReceiverID = rid;
                chatrepo.Insert(chat);
                //Get(sid, rid);
                return Created("", chat);
            }
        }

        //[Route("{id}", Name = "GetUserFromLogin")]
        //[BasicAuthentication]
        //public IHttpActionResult GetUser(int id)
        //{
        //    LoginRepository loginrepo = new LoginRepository();
        //    var user = loginrepo.GetUserByUsername(id.ToString());
        //    if (user != null)
        //    {
        //        EmployeeRepository emprepo = new EmployeeRepository();
        //        var empList=emprepo.GetEmployeeByLoginID(user.ID);
        //        if (empList != null)
        //        {
        //            return Ok(empList);
        //        }
        //        else
        //        {
        //            return StatusCode(HttpStatusCode.NotFound);
        //        }
        //    }
        //    else
        //    {
        //        return StatusCode(HttpStatusCode.NotFound);
        //    }
        //}


        [Route("",Name = "SendMessage")]
        [BasicAuthentication]
        public IHttpActionResult Post(Message message)
        {
            MessageRepository msgrepo = new MessageRepository();
            message.Date = DateTime.Now;
            msgrepo.Insert(message);
            return Created("api/chats/" + message.ID, message);
        }

    }
}
