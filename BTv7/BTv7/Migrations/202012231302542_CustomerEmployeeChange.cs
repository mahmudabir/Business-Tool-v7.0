namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CustomerEmployeeChange : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Customers", "ApprovedBy");
            CreateIndex("dbo.Employees", "AddeddBy");
            AddForeignKey("dbo.Employees", "AddeddBy", "dbo.Employees", "ID");
            AddForeignKey("dbo.Customers", "ApprovedBy", "dbo.Employees", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Customers", "ApprovedBy", "dbo.Employees");
            DropForeignKey("dbo.Employees", "AddeddBy", "dbo.Employees");
            DropIndex("dbo.Employees", new[] { "AddeddBy" });
            DropIndex("dbo.Customers", new[] { "ApprovedBy" });
        }
    }
}
