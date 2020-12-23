using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class SaleType
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Type { get; set; }


        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }
    }
}