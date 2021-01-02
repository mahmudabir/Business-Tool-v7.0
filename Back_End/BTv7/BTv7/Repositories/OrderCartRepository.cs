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
            return this.context.Set<OrderCart>().Where(x => x.OrderID == oid && x.Order.Employee.ID == eid).OrderBy(y => y.Order.ID).ToList();
        }


        //public void UpdateCart(OrderCart orderCart)
        //{

        //    OrderCart fromDB = this.GetAll().Where(x => x.ID == orderCart.ID).First<OrderCart>();


        //    fromDB.Quantity = (int)orderCart.Quantity;
        //    fromDB.CartAmount = (float)orderCart.CartAmount;
        //    fromDB.OrderID = (int)orderCart.OrderID;
        //    fromDB.ProductID = (int)orderCart.ProductID;


        //    this.context.SaveChanges();
        //}


    }
}