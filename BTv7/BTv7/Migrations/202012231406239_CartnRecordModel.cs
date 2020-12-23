namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class CartnRecordModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.OrderCarts",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Quantity = c.Int(nullable: false),
                    CartAmount = c.Single(nullable: false),
                    OrderID = c.Int(nullable: false),
                    ProductID = c.Int(),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Orders", t => t.OrderID, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.ProductID)
                .Index(t => t.OrderID)
                .Index(t => t.ProductID);

            CreateTable(
                "dbo.SaleRecords",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    TotalAmount = c.Single(nullable: false),
                    Date = c.DateTime(nullable: false),
                    OrderID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Orders", t => t.OrderID, cascadeDelete: true)
                .Index(t => t.OrderID);

        }

        public override void Down()
        {
            DropForeignKey("dbo.SaleRecords", "OrderID", "dbo.Orders");
            DropForeignKey("dbo.OrderCarts", "ProductID", "dbo.Products");
            DropForeignKey("dbo.OrderCarts", "OrderID", "dbo.Orders");
            DropIndex("dbo.SaleRecords", new[] { "OrderID" });
            DropIndex("dbo.OrderCarts", new[] { "ProductID" });
            DropIndex("dbo.OrderCarts", new[] { "OrderID" });
            DropTable("dbo.SaleRecords");
            DropTable("dbo.OrderCarts");
        }
    }
}
