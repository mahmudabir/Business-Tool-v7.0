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
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        public List<Customer> GetCustomerByID(int id)
        {
            return this.context.Set<Customer>().Where(x => x.ID == id).ToList();
        }
<<<<<<< Updated upstream

        public List<Customer> GetByName(string id)
        {
            return this.context.Set<Customer>().Where(x => x.Name.ToLower().Contains(id.ToLower())).ToList();
=======
        public void UpdateCustomerDetails(Customer customer)
        {
            using (var customerr = new BTv7DbContext())
            {
                int noOfEmployeeRowAffected = customerr.Database.ExecuteSqlCommand("UPDATE Employees SET Name = '" + customer.Name + "' WHERE ID = " + customer.ID + ";");
            }
>>>>>>> Stashed changes
        }
    }
}