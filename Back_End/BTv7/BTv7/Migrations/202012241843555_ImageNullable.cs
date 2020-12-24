namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImageNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Customers", "Image", c => c.String());
            AlterColumn("dbo.Employees", "Image", c => c.String());
            AlterColumn("dbo.Vendors", "Image", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Vendors", "Image", c => c.String(nullable: false));
            AlterColumn("dbo.Employees", "Image", c => c.String(nullable: false));
            AlterColumn("dbo.Customers", "Image", c => c.String(nullable: false));
        }
    }
}
