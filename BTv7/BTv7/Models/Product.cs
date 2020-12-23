using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Product
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public float BuyPrice { get; set; }

        public float SellPrice { get; set; }


        [ForeignKey("ProductType")]
        public int ProductTypeID { get; set; }
        public virtual ProductType ProductType { get; set; }

        [ForeignKey("ProductStatus")]
        public int ProductStatusID { get; set; }
        public virtual ProductStatus ProductStatus { get; set; }

        [ForeignKey("Vendor")]
        public int VendorID { get; set; }
        public virtual Vendor Vendor { get; set; }


        public int? ModifiedBy { get; set; }


        [JsonIgnore]
        public ICollection<OrderCart> OrderCarts { get; set; }
    }
}