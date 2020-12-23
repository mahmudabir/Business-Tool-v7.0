namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class ChatMessageModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Chats",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    SenderID = c.Int(nullable: false),
                    ReceiverID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID);

            CreateTable(
                "dbo.Messages",
                c => new
                {
                    ID = c.Int(nullable: false, identity: true),
                    Text = c.String(nullable: false),
                    Date = c.DateTime(nullable: false),
                    ChatID = c.Int(nullable: false),
                    MessageStatusID = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Chats", t => t.ChatID, cascadeDelete: true)
                .ForeignKey("dbo.MessageStatus", t => t.MessageStatusID, cascadeDelete: true)
                .Index(t => t.ChatID)
                .Index(t => t.MessageStatusID);

        }

        public override void Down()
        {
            DropForeignKey("dbo.Messages", "MessageStatusID", "dbo.MessageStatus");
            DropForeignKey("dbo.Messages", "ChatID", "dbo.Chats");
            DropIndex("dbo.Messages", new[] { "MessageStatusID" });
            DropIndex("dbo.Messages", new[] { "ChatID" });
            DropTable("dbo.Messages");
            DropTable("dbo.Chats");
        }
    }
}
