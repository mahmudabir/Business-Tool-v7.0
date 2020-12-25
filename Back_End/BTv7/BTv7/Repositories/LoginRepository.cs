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
            return userFromDB.Any(x => x.Username.Equals(username) && x.Password.Equals(password));
        }

        //This method is used to return the User Details
        public Login GetUserDetails(string username, string password)
        {
            List<Login> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.Username.Equals(username) && x.Password == password);
        }
    }
}