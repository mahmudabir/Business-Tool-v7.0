using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class SaleRecord : IValidatableObject
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





        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            SaleRecordRepository db = new SaleRecordRepository();

            if (TotalAmount < 0)
            {
                errors.Add(new ValidationResult($"{nameof(TotalAmount)} cannot be a negative value.", new List<string> { nameof(TotalAmount) }));
            }




            return errors;
        }
    }
}