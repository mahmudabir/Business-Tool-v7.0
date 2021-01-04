using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/managers")]
    public class ManagersController : ApiController
    {
        private OrderRepository orderDB = new OrderRepository();
        //Manager Product
        [Route("getorder", Name = "GetorderByStatusSaleTypeAndIsSold")]
        [BasicAuthentication]
        public IHttpActionResult GetorderByStatusSaleTypeAndIsSold()
        {
            var orderFromDB = orderDB.GetOrderByOrderStatusSaleTypeAndIsSold();
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        //Manager Product

        //order History

        [Route("getorders", Name = "GetordersByStatusSaleTypeAndIsSold")]
        [BasicAuthentication]
        public IHttpActionResult GetordersByStatusSaleTypeAndIsSold()
        {
            var orderFromDB = orderDB.GetOrdersByOrderStatusSaleTypeAndIsSold();
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        //Order History

        //SearchByCustomerName

        [Route("customername/{name}", Name = "GetCustomerByName")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomerByName(string name)
        {
            var orderFromDB = orderDB.GetByCustomerName(name);

            if (orderFromDB != null || orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        //SearchByCustomerName

        //SearchByCustomerName on Order History

        [Route("customernameOnHistory/{name}", Name = "GetCustomersByNameOnHistory")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomersByNameOnHistory(string name)
        {
            var orderFromDB = orderDB.GetByCustomersName(name);

            if (orderFromDB != null || orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        //SearchByCustomerName on Order History

        //Get DeliveryMan
        [Route("deliveryby", Name = "GetDeliveryMan")]
        [BasicAuthentication]
        public IHttpActionResult GetDeliveryMan()
        {
            EmployeeRepository employeeDB = new EmployeeRepository();
            var employeeFromDB = employeeDB.GetEmployeeByUserDesignation();

            if (employeeFromDB != null || employeeFromDB.Count() != 0)
            {
                return Ok(employeeFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        //Get DeliveryMan

        //Approve Order
        [Route("approve/{id}", Name = "PutApprove")]
        [BasicAuthentication]
        public IHttpActionResult PutApprove([FromUri] int id, [FromBody] Order order)
        {


            var pro = orderDB.Get(id);
            order.ID = id;
            //order.SellBy = pro.SellBy;


            orderDB.UpdateOrderStatus(order);

            return Ok(order);


        }
        //Approve Order

        //Cancel Order
        [Route("cancel/{id}", Name = "PutCancel")]
        [BasicAuthentication]
        public IHttpActionResult PutCancel([FromUri] int id, [FromBody] Order order)
        {


           // var pro = orderDB.Get(id);
            order.ID = id;
            //order.SellBy = pro.SellBy;


            OrderCartRepository orderCartDB = new OrderCartRepository();
            ProductRepository productDB = new ProductRepository();


            var cartFromDB = orderCartDB.GetAll().Where(x => x.OrderID == id).ToList();
            //var productFromDB = orderCartDB.GetAll();

            foreach (var item in cartFromDB)
            {
                var productToDB = productDB.Get((int)item.ProductID);

                productToDB.Quantity = productToDB.Quantity + item.Quantity;

                if (productToDB.Quantity <= 0)
                {
                    productToDB.ProductStatusID = 2;
                }

                if (productToDB.Quantity > 0)
                {
                    productToDB.ProductStatusID = 1;
                }

                productDB.Update(productToDB);
            }

            orderDB.UpdateOrderStatusCancel(order);

            return Ok(order);



            //Cancel Order
        }


        //report generate


        [Route("orderstatus", Name = "GetOrderStatus")]
        [BasicAuthentication]
        public IHttpActionResult GetOrderStatus()
        {

            List<object> iData = new List<object>();

            //Creating sample data  
            DataTable dt = new DataTable();
            dt.Columns.Add("Status", System.Type.GetType("System.String"));
            dt.Columns.Add("Count", System.Type.GetType("System.Int32"));

            DataRow dr = dt.NewRow();
            dr["Status"] = "Unapproved";
            dr["Count"] = orderDB.GetAll().Where(x => x.OrderStatusID==1).Count();
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["Status"] = "Approved";
            dr["Count"] = orderDB.GetAll().Where(x => x.OrderStatusID == 2).Count();
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["Status"] = "Canceled";
            dr["Count"] = orderDB.GetAll().Where(x => x.OrderStatusID == 3).Count();
            dt.Rows.Add(dr);

            //Looping and extracting each DataColumn to List<Object>  
            foreach (DataColumn dc in dt.Columns)
            {
                List<object> x = new List<object>();
                x = (from DataRow drr in dt.Rows select drr[dc.ColumnName]).ToList();
                iData.Add(x);
            }
            //Source data returned as JSON  
            return Ok(iData);
        }
    }
}
