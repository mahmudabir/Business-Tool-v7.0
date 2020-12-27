using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Message
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int SenderID { get; set; }
        [Required]
        public int ReceiverID { get; set; }



        [ForeignKey("Chat")]
        public int ChatID { get; set; }
        public virtual Chat Chat { get; set; }

        [ForeignKey("MessageStatus")]
        public int MessageStatusID { get; set; }
        public virtual MessageStatus MessageStatus { get; set; }
    }
}