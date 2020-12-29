namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DropImportantInNote : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Notes", "Important");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Notes", "Important", c => c.Boolean(nullable: false));
        }
    }
}
