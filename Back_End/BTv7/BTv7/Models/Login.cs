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
    public class Login : IValidatableObject
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Mobile { get; set; }
        [Required]
        public string Password { get; set; }


        [ForeignKey("AccessStatus")]
        public int AccessStatusID { get; set; }
        public virtual AccessStatus AccessStatus { get; set; }


        [ForeignKey("UserDesignation")]
        public int UserDesignationID { get; set; }
        public virtual UserDesignation UserDesignation { get; set; }


        [ForeignKey("RegistrationStatus")]
        public int RegistrationStatusID { get; set; }
        public virtual RegistrationStatus RegistrationStatus { get; set; }




        [JsonIgnore]
        public virtual ICollection<Employee> Employees { get; set; }
        [JsonIgnore]
        public virtual ICollection<Customer> Customers { get; set; }
        [JsonIgnore]
        public virtual ICollection<Vendor> Vendors { get; set; }
        [JsonIgnore]
        public virtual ICollection<Product> Products { get; set; }






        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            LoginRepository db = new LoginRepository();


            //Username property
            if (db.GetAll().Where(x => x.Username == Username).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"{nameof(Username)} exists already.", new List<string> { nameof(Username) }));
            }
            if (Username.Length < 4)
            {
                errors.Add(new ValidationResult($"{nameof(Username)} must contain atleast 4 characters.", new List<string> { nameof(Username) }));
            }



            //Email property
            if (db.GetAll().Where(x => x.Email == Email).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"{nameof(Email)} exists already.", new List<string> { nameof(Email) }));
            }




            //Mobile property
            if (db.GetAll().Where(x => x.Mobile == Mobile).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"{nameof(Mobile)} exists already.", new List<string> { nameof(Mobile) }));
            }


            //Password property
            if (Password.Length < 4)
            {
                errors.Add(new ValidationResult($"{nameof(Password)}  must contain atleast 4 characters.", new List<string> { nameof(Password) }));
            }

            return errors;
        }

    }
}