using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class OrderCart
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public float CartAmount { get; set; }


        [ForeignKey("Order")]
        public int OrderID { get; set; }
        public virtual Order Order { get; set; }


        [ForeignKey("Product")]
        public int? ProductID { get; set; }
        public virtual Product Product { get; set; }
    }
}