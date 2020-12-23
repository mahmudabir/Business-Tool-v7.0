using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class ProductStatus
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Status { get; set; }
    }
}