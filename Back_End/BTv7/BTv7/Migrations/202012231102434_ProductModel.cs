namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class ProductModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Products",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Name = c.String(nullable: false),
                    Image = c.String(),
                    Quantity = c.Int(nullable: false),
                    BuyPrice = c.Single(nullable: false),
                    SellPrice = c.Single(nullable: false),
                    ProductTypeID = c.Int(nullable: false),
                    ProductStatusID = c.Int(nullable: false),
                    VendorID = c.Int(nullable: false),
                    ModifiedBy = c.Int(),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.ProductStatus", t => t.ProductStatusID, cascadeDelete: true)
                .ForeignKey("dbo.ProductTypes", t => t.ProductTypeID, cascadeDelete: true)
                .ForeignKey("dbo.Vendors", t => t.VendorID, cascadeDelete: true)
                .Index(t => t.ProductTypeID)
                .Index(t => t.ProductStatusID)
                .Index(t => t.VendorID);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Products", "VendorID", "dbo.Vendors");
            DropForeignKey("dbo.Products", "ProductTypeID", "dbo.ProductTypes");
            DropForeignKey("dbo.Products", "ProductStatusID", "dbo.ProductStatus");
            DropIndex("dbo.Products", new[] { "VendorID" });
            DropIndex("dbo.Products", new[] { "ProductStatusID" });
            DropIndex("dbo.Products", new[] { "ProductTypeID" });
            DropTable("dbo.Products");
        }
    }
}
