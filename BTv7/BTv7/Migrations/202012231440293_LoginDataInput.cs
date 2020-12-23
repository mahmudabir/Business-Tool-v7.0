namespace BTv7.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class LoginDataInput : DbMigration
    {
        public override void Up()
        {
            Sql("INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) " +
                "VALUES ('1', 'admin@gmail.com', '+8801234567890', '1111', 1, 1, 2)");
            Sql("INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) " +
                "VALUES ('2', 'manager@gmail.com', '+8801234567890', '2222', 1, 1, 2)");
            Sql("INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) " +
                "VALUES ('3', 'salesman@gmail.com', '+8801234567890', '3333', 1, 1, 2)");
            Sql("INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) " +
                "VALUES ('4', 'deliveryman@gmail.com', '+8801234567890', '4444', 1, 1, 2)");
            Sql("INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) " +
                "VALUES ('5', 'customer@gmail.com', '+8801234567890', '5555', 1, 1, 2)");
            Sql("INSERT INTO Logins (Username, Email, Mobile, Password, AccessStatusID, UserDesignationID, RegistrationStatusID) " +
                "VALUES ('6', 'vendor@gmail.com', '+8801234567890', '6666', 1, 1, 2)");
        }

        public override void Down()
        {
        }
    }
}
