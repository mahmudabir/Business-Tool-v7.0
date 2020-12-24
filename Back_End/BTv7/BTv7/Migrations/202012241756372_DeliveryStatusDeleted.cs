namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DeliveryStatusDeleted : DbMigration
    {
        public override void Up()
        {
            DropTable("dbo.DeliveryStatus");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.DeliveryStatus",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Status = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
    }
}
