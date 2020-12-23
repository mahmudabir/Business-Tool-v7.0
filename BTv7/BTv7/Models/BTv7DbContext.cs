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













        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}