using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class OrderRepository : Repository<Order>
    {
        public List<Order> GetAllOrderByCustomerID(int cid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid).ToList();
        }


        public List<Order> GetAllPendingOrderByCustomerID(int cid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && x.OrderStatusID == 1).ToList();
        }


        public List<Order> GetAllConfirmedOrderByCustomerID(int cid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && x.OrderStatusID == 2).ToList();
        }


        public List<Order> GetAllCanceledOrderByCustomerID(int cid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && (x.OrderStatusID == 3 || x.OrderStatusID == 5)).ToList();
        }



        public List<Order> GetAllRecievedOrderByCustomerID(int cid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && x.OrderStatusID == 4).ToList();
        }




        public List<Order> GetOrderByCustomerNOrderID(int cid, int oid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && x.ID == oid).ToList();
        }

        public List<Order> GetOrderByCustomerNStatusID(int cid, int osid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && x.OrderStatusID == osid).ToList();
        }

        public List<Order> GetOrderByCustomerNSaleTypeID(int cid, int stid)
        {
            return this.GetAll().Where(x => x.CustomerID == cid && x.SaleTypeID == stid).ToList();
        }

        public List<Order> GetOrderByDeliverymanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.OrderStatusID == 2).ToList();
        }

        public Order GetOrderByDeliverymanIDNOrderIDnStatusID(int eid, int oid)
        {
            List<Order> orderFromDB = this.GetAll();
            return orderFromDB.FirstOrDefault(x => x.SellBy == eid && x.ID == oid && x.OrderStatusID == 2);
        }


        public List<Order> GetAcceptOrderBydeliverymanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.OrderStatusID == 4).ToList();
        }


        public List<Order> GetRejectOrderBydeliverymanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.OrderStatusID == 5).ToList();
        }


        public List<Order> GetAllUncheckedOrders(int eid)
        {
            return this.GetAll().Where(x => x.SellBy == eid && x.SaleTypeID == 2 && x.IsSold == false).ToList();
        }

        public List<Order> GetPendingOrderBydeliverymanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.OrderStatusID == 2).ToList();
        }
        public List<Order> GetSellBySalesmanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.OrderStatusID == 4).ToList();
        }
        
        public List<Order> GetTopSellBySalesmanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.TotalAmount >= 100000).ToList();
        }
        public List<Order> GetPoorSellBySalesmanID(int id)
        {
            return this.context.Set<Order>().OrderBy(y => y.ID).Where(x => x.SellBy == id && x.TotalAmount <= 50000).ToList();
        }

        //Manager Approve order
        public List<Order> GetOrderByOrderStatusSaleTypeAndIsSold()
        {
            return this.context.Set<Order>().Where(x => x.OrderStatusID == 1 && x.IsSold==false && x.SaleTypeID==2).ToList();
        }
        //Manager Approve order

        //SearchByCustomerName

        public List<Order> GetByCustomerName(string id)
        {
            return this.context.Set<Order>().Where(x => x.CustomerName.ToLower().Contains(id.ToLower()) && x.OrderStatusID == 1 && x.IsSold == false && x.SaleTypeID == 2).ToList();
        }

        //SearchByCustomerName

        //Approve Order

        public void UpdateOrderStatus(Order order)
        {
            using (var pro = new BTv7DbContext())
            {
                pro.Database.ExecuteSqlCommand("UPDATE Orders SET OrderStatusID='"+order.OrderStatusID+"', SellBy='"+order.SellBy+"' WHERE ID = " + order.ID + ";");
            }
        }
        //Approve Order
    }
}