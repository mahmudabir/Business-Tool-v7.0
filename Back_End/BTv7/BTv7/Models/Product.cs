using BTv7.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Product : IValidatableObject
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
        [Required]
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

        [ForeignKey("Login")]
        public int? ModifiedBy { get; set; }
        public Login Login { get; set; }


        [JsonIgnore]
        public virtual ICollection<OrderCart> OrderCarts { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            ProductRepository db = new ProductRepository();

            if (BuyPrice < 0)
            {
                errors.Add(new ValidationResult($"{nameof(BuyPrice)} cannot be a negative value.", new List<string> { nameof(BuyPrice) }));
            }
            if (SellPrice < 0)
            {
                errors.Add(new ValidationResult($"{nameof(SellPrice)} cannot be a negative value.", new List<string> { nameof(SellPrice) }));
            }
            if (SellPrice < BuyPrice)
            {
                errors.Add(new ValidationResult($"{nameof(SellPrice)} cannot be less than {nameof(BuyPrice)}"));
            }


            if (Quantity < 0)
            {
                errors.Add(new ValidationResult($"{nameof(Quantity)} cannot be a negative value.", new List<string> { nameof(Quantity) }));
            }




            return errors;
        }

    }
}