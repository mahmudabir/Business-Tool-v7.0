namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FeedbackNoteNoticeModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Feedbacks",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Email = c.String(nullable: false),
                        Subject = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        CustomerID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Customers", t => t.CustomerID, cascadeDelete: true)
                .Index(t => t.CustomerID);
            
            CreateTable(
                "dbo.Notes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Subject = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        EmployeeID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Employees", t => t.EmployeeID, cascadeDelete: true)
                .Index(t => t.EmployeeID);
            
            CreateTable(
                "dbo.Notices",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Subject = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        EmployeeID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Employees", t => t.EmployeeID, cascadeDelete: true)
                .Index(t => t.EmployeeID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Notices", "EmployeeID", "dbo.Employees");
            DropForeignKey("dbo.Notes", "EmployeeID", "dbo.Employees");
            DropForeignKey("dbo.Feedbacks", "CustomerID", "dbo.Customers");
            DropIndex("dbo.Notices", new[] { "EmployeeID" });
            DropIndex("dbo.Notes", new[] { "EmployeeID" });
            DropIndex("dbo.Feedbacks", new[] { "CustomerID" });
            DropTable("dbo.Notices");
            DropTable("dbo.Notes");
            DropTable("dbo.Feedbacks");
        }
    }
}
