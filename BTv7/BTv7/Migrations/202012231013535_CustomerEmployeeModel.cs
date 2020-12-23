namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class CustomerEmployeeModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Name = c.String(nullable: false),
                    Image = c.String(nullable: false),
                    JoinDate = c.DateTime(nullable: false),
                    ApprovedBy = c.Int(),
                    Address = c.String(),
                    LoginID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Logins", t => t.LoginID, cascadeDelete: true)
                .Index(t => t.LoginID);

            CreateTable(
                "dbo.Employees",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Name = c.String(nullable: false),
                    Image = c.String(nullable: false),
                    Salary = c.Single(nullable: false),
                    JoinDate = c.DateTime(nullable: false),
                    AddeddBy = c.Int(),
                    LoginID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Logins", t => t.LoginID, cascadeDelete: true)
                .Index(t => t.LoginID);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Employees", "LoginID", "dbo.Logins");
            DropForeignKey("dbo.Customers", "LoginID", "dbo.Logins");
            DropIndex("dbo.Employees", new[] { "LoginID" });
            DropIndex("dbo.Customers", new[] { "LoginID" });
            DropTable("dbo.Employees");
            DropTable("dbo.Customers");
        }
    }
}
