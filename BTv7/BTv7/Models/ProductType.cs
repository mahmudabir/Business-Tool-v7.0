using BTv7.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class ProductType : IValidatableObject
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Type { get; set; }

        [JsonIgnore]
        public virtual ICollection<Product> Products { get; set; }


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            ProductTypeRepository db = new ProductTypeRepository();

            if (db.GetAll().Where(x => x.Type == Type).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"{nameof(Type)} exists already.", new List<string> { nameof(Type) }));
            }





            return errors;
        }
    }
}