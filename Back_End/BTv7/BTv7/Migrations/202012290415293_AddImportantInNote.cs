namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddImportantInNote : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Notes", "Important", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Notes", "Important");
        }
    }
}
