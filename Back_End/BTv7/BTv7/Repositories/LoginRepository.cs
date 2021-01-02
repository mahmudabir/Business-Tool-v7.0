using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class LoginRepository : Repository<Login>
    {
        //This method is used to check the user credentials
        public bool Login(string username, string password)
        {
            List<Login> userFromDB = this.GetAll();
            return userFromDB.Any(x => x.Username.Equals(username) && x.Password.Equals(password) && x.AccessStatusID.Equals(1) && x.RegistrationStatusID.Equals(2));
        }

        //This method is used to return the User Details
        public Login GetUserDetails(string username, string password)
        {
            List<Login> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.Username.Equals(username) && x.Password == password);
        }
        //This method is used to get the User Details
        public Login GetUserByUsername(string username)
        {
            List<Login> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.Username.Equals(username));
        }

        public Login GetLoginByID(int id)
        {
            List<Login> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.ID == id);
        }

        public void UpdateEmployeeLoginDetails(Login log)
        {
            using (var login = new BTv7DbContext())
            {
                int noOfLoginRowAffected = login.Database.ExecuteSqlCommand("UPDATE Logins SET Email = '" + log.Email + "', Mobile = '" + log.Mobile + "', UserDesignationID = '" + log.UserDesignationID + "' WHERE ID = " + log.ID + ";");
            }
        }        
        
        public void UpdatePassword(Login log)
        {
            using (var login = new BTv7DbContext())
            {
                int noOfLoginRowAffected = login.Database.ExecuteSqlCommand("UPDATE Logins SET Password = '" + log.Password +"' WHERE ID = " + log.ID + ";");
            }
        }

        public void DisableLogin(Login log)
        {
            using (var login1 = new BTv7DbContext())
            {
                int d = login1.Database.ExecuteSqlCommand("UPDATE Logins SET AccessStatusID = '" + log.AccessStatusID + "' WHERE ID = " + log.ID + ";");
            }
        }

        public void EnableLogin(Login log)
        {
            using (var login2 = new BTv7DbContext())
            {
                int e = login2.Database.ExecuteSqlCommand("UPDATE Logins SET AccessStatusID = '" + log.AccessStatusID + "' WHERE ID = " + log.ID + ";");
            }
        }

        public void AproveAllPendingCustomers()
        {
            using (var p2 = new BTv7DbContext())
            {
                int e = p2.Database.ExecuteSqlCommand("UPDATE Logins SET AccessStatusID = '1', RegistrationStatusID = '2' WHERE RegistrationStatusID = '1' AND UserDesignationID = '5';");
            }
        }

        public void AproveUser(int id)
        {
            using (var p2 = new BTv7DbContext())
            {
                int e = p2.Database.ExecuteSqlCommand("UPDATE Logins SET AccessStatusID = '1', RegistrationStatusID = '2' WHERE ID = "+id+";");
            }
        }

    }
}