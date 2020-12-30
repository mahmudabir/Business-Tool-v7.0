using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class OrderCartRepository : Repository<OrderCart>
    {

        public List<OrderCart> GetCartsByOrderID(int oid)
        {
            return this.GetAll().Where(x => x.OrderID == oid).ToList();
        }


        public List<OrderCart> GetCartsByCustomerNOrderID(int cid, int oid)
        {
            return this.GetAll().Where(x => x.OrderID == oid && x.Order.Customer.ID == cid).ToList();
        }

        public List<OrderCart> GetCartsByEmployeeNOrderID(int eid, int oid)
        {
            return this.GetAll().Where(x => x.OrderID == oid && x.Order.Employee.ID == eid).ToList();
        }

    }
}