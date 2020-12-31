namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class OrderModelAddressNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Orders", "Address", c => c.String());
        }

        public override void Down()
        {
            AlterColumn("dbo.Orders", "Address", c => c.String(nullable: false));
        }
    }
}
