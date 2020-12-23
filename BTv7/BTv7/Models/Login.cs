using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Login
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
        public AccessStatus AccessStatus { get; set; }


        [ForeignKey("UserDesignation")]
        public int UserDesignationID { get; set; }
        public UserDesignation UserDesignation { get; set; }


        [ForeignKey("RegistrationStatus")]
        public int RegistrationStatusID { get; set; }
        public RegistrationStatus RegistrationStatus { get; set; }




        [JsonIgnore]
        public ICollection<Employee> Employees { get; set; }
        [JsonIgnore]
        public ICollection<Customer> Customers { get; set; }
        [JsonIgnore]
        public ICollection<Vendor> Vendors { get; set; }
    }
}