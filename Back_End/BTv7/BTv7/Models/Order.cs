﻿using BTv7.Repositories;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class Order : IValidatableObject
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public float TotalAmount { get; set; }
        public string Address { get; set; }


        [ForeignKey("Customer")]
        public int? CustomerID { get; set; }
        public virtual Customer Customer { get; set; }

        public string CustomerName { get; set; }

        [ForeignKey("SaleType")]
        public int SaleTypeID { get; set; }
        public virtual SaleType SaleType { get; set; }
        [Required]
        public bool IsSold { get; set; }

        [ForeignKey("OrderStatus")]
        public int OrderStatusID { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }

        [ForeignKey("Employee")]
        public int? SellBy { get; set; }
        public virtual Employee Employee { get; set; }


        [JsonIgnore]
        public virtual ICollection<OrderCart> OrderCarts { get; set; }
        [JsonIgnore]
        public virtual ICollection<SaleRecord> SaleRecords { get; set; }








        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            OrderRepository db = new OrderRepository();

            if (TotalAmount < 0)
            {
                errors.Add(new ValidationResult($"{nameof(TotalAmount)} cannot be a negative value.", new List<string> { nameof(TotalAmount) }));
            }




            //var orderFromDB = db.GetAll()
            //    .Where(x => x.CustomerID == CustomerID && x.SaleTypeID == 1 && x.IsSold == false && x.OrderStatusID == 6).ToList();


            //if (orderFromDB.Count != 0)
            //{
            //    errors.Add(new ValidationResult($"Order Cannot be created because there is an active order."));
            //}



            return errors;
        }
    }
}