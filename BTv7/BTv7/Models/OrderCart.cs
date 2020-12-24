using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class OrderCart : IValidatableObject
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






        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            //OrderCartRepository db = new OrderCartRepository();

            if (CartAmount < 0)
            {
                errors.Add(new ValidationResult($"{nameof(CartAmount)} cannot be a negative value.", new List<string> { nameof(CartAmount) }));
            }
            if (Quantity < 0)
            {
                errors.Add(new ValidationResult($"{nameof(Quantity)} cannot be a negative value.", new List<string> { nameof(Quantity) }));
            }




            return errors;
        }
    }
}