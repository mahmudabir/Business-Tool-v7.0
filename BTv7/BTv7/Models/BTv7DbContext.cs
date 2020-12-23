using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BTv7.Models
{
    public class BTv7DbContext : DbContext
    {
        public BTv7DbContext() : base("BTv7DB")
        {

        }
        public DbSet<UserDesignation> UserDesignations { get; set; }
        public DbSet<AccessStatus> AccessStatuses { get; set; }
        public DbSet<RegistrationStatus> RegistrationStatuses { get; set; }
        public DbSet<ProductStatus> ProductStatuses { get; set; }
        public DbSet<OrderStatus> OrderStatuses { get; set; }
        public DbSet<MessageStatus> MessageStatuses { get; set; }
        public DbSet<DeliveryStatus> DeliveryStatuses { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Login> Logins { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Notice> Notices { get; set; }












        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}