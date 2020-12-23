namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class StatusDataInput : DbMigration
    {
        public override void Up()
        {
            // Status Table's Data Input
            Sql("INSERT INTO UserDesignations (Designation) VALUES ('ADMIN'), ('MANAGER'), ('SALESMAN'), ('DELIVERYMAN'), ('CUSTOMER'), ('VENDOR')");
            Sql("INSERT INTO AccessStatus (Status) VALUES ('ALLOWED'), ('RESTRICTED')");
            Sql("INSERT INTO DeliveryStatus (Status) VALUES ('DELIVERED'), ('RETURNED')");
            Sql("INSERT INTO MessageStatus (Status) VALUES ('SEEN'), ('UNSEEN')");
            Sql("INSERT INTO OrderStatus (Status) VALUES ('UNAPPROVED'), ('APPROVED'), ('CANCELED'), ('ACCEPTED'), ('RETURNED')");
            Sql("INSERT INTO SaleTypes (Type) VALUES ('ONLINE'), ('OFFLINE')");
            Sql("INSERT INTO ProductStatus (Status) VALUES ('AVAILABLE'), ('UNAVAILABLE')");
            Sql("INSERT INTO RegistrationStatus (Status) VALUES ('PENDING'), ('APPROVED'), ('CANCELED')");
        }

        public override void Down()
        {
        }
    }
}
