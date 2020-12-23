using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Chat
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int SenderID { get; set; }
        [Required]
        public int ReceiverID { get; set; }



        [JsonIgnore]
        public ICollection<Message> Messages { get; set; }
    }
}