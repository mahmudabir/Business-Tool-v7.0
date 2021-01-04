namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class OrderModelSellByNullable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "SellBy", "dbo.Employees");
            DropIndex("dbo.Orders", new[] { "SellBy" });
            AlterColumn("dbo.Orders", "SellBy", c => c.Int());
            CreateIndex("dbo.Orders", "SellBy");
            AddForeignKey("dbo.Orders", "SellBy", "dbo.Employees", "ID");
        }

        public override void Down()
        {
            DropForeignKey("dbo.Orders", "SellBy", "dbo.Employees");
            DropIndex("dbo.Orders", new[] { "SellBy" });
            AlterColumn("dbo.Orders", "SellBy", c => c.Int(nullable: false));
            CreateIndex("dbo.Orders", "SellBy");
            AddForeignKey("dbo.Orders", "SellBy", "dbo.Employees", "ID", cascadeDelete: true);
        }
    }
}
