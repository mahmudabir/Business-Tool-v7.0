namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NewColumnAddNoteModel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Notes", "Important", c => c.String(nullable: false));
            AddColumn("dbo.Notes", "Date", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Notes", "Date");
            DropColumn("dbo.Notes", "Important");
        }
    }
}
