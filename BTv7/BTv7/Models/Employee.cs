using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Employee
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public float Salary { get; set; }
        [Required]
        public DateTime JoinDate { get; set; }

        [ForeignKey("Employeee")]
        public int? AddeddBy { get; set; }
        public virtual Employee Employeee { get; set; }


        [ForeignKey("Login")]
        public int LoginID { get; set; }
        public virtual Login Login { get; set; }


        [JsonIgnore]
        public ICollection<Note> Notes { get; set; }
        [JsonIgnore]
        public ICollection<Notice> Notices { get; set; }
        [JsonIgnore]
        public ICollection<Customer> Customers { get; set; }
        [JsonIgnore]
        public ICollection<Employee> Employees { get; set; }
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }
    }
}