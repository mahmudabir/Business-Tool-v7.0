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
    public class Customer : IValidatableObject
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        public string Image { get; set; }
        [Required]
        public DateTime JoinDate { get; set; }


        [ForeignKey("Employeee")]
        public int? ApprovedBy { get; set; }
        public virtual Employee Employeee { get; set; }

        public string Address { get; set; }


        [ForeignKey("Login")]
        public int LoginID { get; set; }
        public virtual Login Login { get; set; }



        [JsonIgnore]
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }




        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            CustomerRepository cdb = new CustomerRepository();
            EmployeeRepository edb = new EmployeeRepository();
            VendorRepository vdb = new VendorRepository();


            //check if the same login id is available in employee, customer and vendor tables

            if (cdb.GetAll().Where(x => x.LoginID == LoginID).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"User exists already.", new List<string> { nameof(LoginID) }));
            }
            if (edb.GetAll().Where(x => x.LoginID == LoginID).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"User exists already.", new List<string> { nameof(LoginID) }));
            }
            if (vdb.GetAll().Where(x => x.LoginID == LoginID).FirstOrDefault() != null)
            {
                errors.Add(new ValidationResult($"User exists already.", new List<string> { nameof(LoginID) }));
            }

            return errors;
        }
    }
}