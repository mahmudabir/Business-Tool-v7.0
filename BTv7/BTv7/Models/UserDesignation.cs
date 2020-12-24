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
    public class UserDesignation : IValidatableObject
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Designation { get; set; }

        [JsonIgnore]
        public virtual ICollection<Login> Logins { get; set; }



        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            UserDesignationRepository db = new UserDesignationRepository();

            if (db.GetAll().Where(x => x.Designation == Designation).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"{nameof(Designation)} exists already.", new List<string> { nameof(Designation) }));
            }





            return errors;
        }
    }
}