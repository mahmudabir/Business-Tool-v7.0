using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class UserDesignation
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Designation { get; set; }

        [JsonIgnore]
        public ICollection<Login> Logins { get; set; }
    }
}