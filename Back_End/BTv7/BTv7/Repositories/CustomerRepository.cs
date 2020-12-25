using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class CustomerRepository : Repository<Customer>
    {
        public Customer GetCustomerByLoginID(int loginID)
        {
            List<Customer> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.LoginID.Equals(loginID));
        }
    }
}