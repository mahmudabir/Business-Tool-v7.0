using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Order
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public float TotalAmount { get; set; }
        [Required]
        public string Address { get; set; }


        [ForeignKey("Customer")]
        public int? CustomerID { get; set; }
        public virtual Customer Customer { get; set; }
        [Required]
        public string CustomerName { get; set; }

        [ForeignKey("SaleType")]
        public int? SaleTypeID { get; set; }
        [Required]
        public virtual SaleType SaleType { get; set; }
        [Required]
        public bool IsSold { get; set; }

        [ForeignKey("OrderStatus")]
        public int OrderStatusID { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }

        [ForeignKey("Employee")]
        public int SellBy { get; set; }
        public virtual Employee Employee { get; set; }


        [JsonIgnore]
        public ICollection<OrderCart> OrderCarts { get; set; }
        [JsonIgnore]
        public ICollection<SaleRecord> SaleRecords { get; set; }
    }
}