using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class SaleRecord
    {

        [Key]
        public int ID { get; set; }
        [Required]
        public float TotalAmount { get; set; }
        [Required]
        public DateTime Date { get; set; }


        [ForeignKey("Order")]
        public int OrderID { get; set; }
        public virtual Order Order { get; set; }
    }
}