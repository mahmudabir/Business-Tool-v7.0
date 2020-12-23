using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Customer
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public DateTime JoinDate { get; set; }
        public int? ApprovedBy { get; set; }
        public string Address { get; set; }


        [ForeignKey("Login")]
        public int LoginID { get; set; }
        public virtual Login Login { get; set; }



        [JsonIgnore]
        public ICollection<Feedback> Feedbacks { get; set; }
    }
}