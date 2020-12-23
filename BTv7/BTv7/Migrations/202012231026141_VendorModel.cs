namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class VendorModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Vendors",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Image = c.String(nullable: false),
                        JoinDate = c.DateTime(nullable: false),
                        AddedBy = c.Int(),
                        LoginID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Logins", t => t.LoginID, cascadeDelete: true)
                .Index(t => t.LoginID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vendors", "LoginID", "dbo.Logins");
            DropIndex("dbo.Vendors", new[] { "LoginID" });
            DropTable("dbo.Vendors");
        }
    }
}
