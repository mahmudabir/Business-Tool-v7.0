namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class OrderModelCustomerNameNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Orders", "CustomerName", c => c.String());
        }

        public override void Down()
        {
            AlterColumn("dbo.Orders", "CustomerName", c => c.String(nullable: false));
        }
    }
}
