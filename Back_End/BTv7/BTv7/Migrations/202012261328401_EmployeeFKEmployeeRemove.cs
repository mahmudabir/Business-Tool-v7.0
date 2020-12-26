namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class EmployeeFKEmployeeRemove : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Employees", "AddeddBy", "dbo.Employees");
            DropIndex("dbo.Employees", new[] { "AddeddBy" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Employees", "AddeddBy");
            AddForeignKey("dbo.Employees", "AddeddBy", "dbo.Employees", "ID");
        }
    }
}
