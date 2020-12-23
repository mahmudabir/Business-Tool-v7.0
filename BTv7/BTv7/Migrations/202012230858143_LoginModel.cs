namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class LoginModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Logins",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Username = c.String(nullable: false),
                    Email = c.String(nullable: false),
                    Mobile = c.String(nullable: false),
                    Password = c.String(nullable: false),
                    AccessStatusID = c.Int(nullable: false),
                    UserDesignationID = c.Int(nullable: false),
                    RegistrationStatusID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.AccessStatus", t => t.AccessStatusID, cascadeDelete: true)
                .ForeignKey("dbo.RegistrationStatus", t => t.RegistrationStatusID, cascadeDelete: true)
                .ForeignKey("dbo.UserDesignations", t => t.UserDesignationID, cascadeDelete: true)
                .Index(t => t.AccessStatusID)
                .Index(t => t.UserDesignationID)
                .Index(t => t.RegistrationStatusID);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Logins", "UserDesignationID", "dbo.UserDesignations");
            DropForeignKey("dbo.Logins", "RegistrationStatusID", "dbo.RegistrationStatus");
            DropForeignKey("dbo.Logins", "AccessStatusID", "dbo.AccessStatus");
            DropIndex("dbo.Logins", new[] { "RegistrationStatusID" });
            DropIndex("dbo.Logins", new[] { "UserDesignationID" });
            DropIndex("dbo.Logins", new[] { "AccessStatusID" });
            DropTable("dbo.Logins");
        }
    }
}
