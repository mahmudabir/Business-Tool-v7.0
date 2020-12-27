namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SenderReceiverIdInMessagesTable : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Messages", "SenderID", c => c.Int(nullable: false));
            AddColumn("dbo.Messages", "ReceiverID", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Messages", "ReceiverID");
            DropColumn("dbo.Messages", "SenderID");
        }
    }
}
