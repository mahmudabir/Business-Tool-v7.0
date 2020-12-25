using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class EmployeeRepository : Repository<Employee>
    {
        public Employee GetEmployeeByLoginID(int loginID)
        {
            List<Employee> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.LoginID.Equals(loginID));
        }
    }
}