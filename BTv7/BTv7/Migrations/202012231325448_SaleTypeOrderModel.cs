namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SaleTypeOrderModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Date = c.DateTime(nullable: false),
                        TotalAmount = c.Single(nullable: false),
                        Address = c.String(nullable: false),
                        CustomerID = c.Int(),
                        CustomerName = c.String(nullable: false),
                        SaleTypeID = c.Int(nullable: false),
                        IsSold = c.Boolean(nullable: false),
                        OrderStatusID = c.Int(nullable: false),
                        SellBy = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Customers", t => t.CustomerID)
                .ForeignKey("dbo.Employees", t => t.SellBy, cascadeDelete: true)
                .ForeignKey("dbo.OrderStatus", t => t.OrderStatusID, cascadeDelete: true)
                .ForeignKey("dbo.SaleTypes", t => t.SaleTypeID, cascadeDelete: true)
                .Index(t => t.CustomerID)
                .Index(t => t.SaleTypeID)
                .Index(t => t.OrderStatusID)
                .Index(t => t.SellBy);
            
            CreateTable(
                "dbo.SaleTypes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Type = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Orders", "SaleTypeID", "dbo.SaleTypes");
            DropForeignKey("dbo.Orders", "OrderStatusID", "dbo.OrderStatus");
            DropForeignKey("dbo.Orders", "SellBy", "dbo.Employees");
            DropForeignKey("dbo.Orders", "CustomerID", "dbo.Customers");
            DropIndex("dbo.Orders", new[] { "SellBy" });
            DropIndex("dbo.Orders", new[] { "OrderStatusID" });
            DropIndex("dbo.Orders", new[] { "SaleTypeID" });
            DropIndex("dbo.Orders", new[] { "CustomerID" });
            DropTable("dbo.SaleTypes");
            DropTable("dbo.Orders");
        }
    }
}
