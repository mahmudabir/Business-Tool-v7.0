namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NoticeModelPostDateAdd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Notices", "PostDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Notices", "PostDate");
        }
    }
}
