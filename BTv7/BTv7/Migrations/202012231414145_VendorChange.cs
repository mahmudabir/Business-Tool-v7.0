namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VendorChange : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Vendors", "AddedBy");
            AddForeignKey("dbo.Vendors", "AddedBy", "dbo.Employees", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vendors", "AddedBy", "dbo.Employees");
            DropIndex("dbo.Vendors", new[] { "AddedBy" });
        }
    }
}
