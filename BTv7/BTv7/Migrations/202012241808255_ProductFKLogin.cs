namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProductFKLogin : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Products", "ModifiedBy");
            AddForeignKey("dbo.Products", "ModifiedBy", "dbo.Logins", "ID");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "ModifiedBy", "dbo.Logins");
            DropIndex("dbo.Products", new[] { "ModifiedBy" });
        }
    }
}
