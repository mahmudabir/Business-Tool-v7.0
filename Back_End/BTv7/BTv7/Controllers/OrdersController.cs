using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;

namespace BTv7.Controllers
{
    [RoutePrefix("api/orders"), BasicAuthentication]
    public class OrdersController : ApiController
    {
        private OrderRepository orderDB = new OrderRepository();

        [Route("", Name = "GetOrders")]
        public IHttpActionResult Get()
        {
            var orderFromDB = orderDB.GetAll();
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }


        [Route("{id}", Name = "GetOrderByID")]
        public IHttpActionResult Get(int id)
        {
            var orderFromDB = orderDB.Get(id);
            if (orderFromDB != null)
            {
                var result = orderFromDB.AddLinks(
                    new HyperMedia { Href = Url.Link("GetOrders", null), Method = "GET", Rel = "Get all orders." },
                    new HyperMedia { Href = Url.Link("GetOrderByID", new { id = id }), Method = "GET", Rel = "Get one order by ID." }
                    );
                return Ok(result);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }



        [Route("{oid}/items", Name = "GetCartsByOrderID")]
        public IHttpActionResult GetCartsByOrderID(int oid)
        {
            OrderCartRepository orderCartDB = new OrderCartRepository();

            var cartFromDB = orderCartDB.GetCartsByOrderID(oid);

            if (cartFromDB.Count != 0)
            {
                return Ok(cartFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }




        [Route("update_amount/{id}", Name = "PutUpdateAmountOrder")]
        [BasicAuthentication]
        public IHttpActionResult PutUpdateAmountOrder(int id, Order order)
        {
            OrderCartRepository orderCartDB = new OrderCartRepository();


            var cartFromDB = orderCartDB.GetAll().Where(x => x.OrderID == id).ToList();

            //var orderFromDB = orderDB.GetAll().Where(x => x.ID == id).FirstOrDefault();

            //order.CustomerName = orderFromDB.CustomerName;

            var total = (float)0;
            if (cartFromDB.Count != 0)
            {
                foreach (var item in cartFromDB)
                {
                    total += (float)item.CartAmount;
                }
                order.TotalAmount = (float)total;
            }
            else
            {
                order.TotalAmount = (float)0;
            }




            if (ModelState.IsValid)
            {
                OrderRepository orderDB2 = new OrderRepository();
                orderDB2.Update(order);
                return Ok(order);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }









        [Route("checkout/{id}", Name = "PutCheckoutOrder")]
        [BasicAuthentication]
        public IHttpActionResult PutCheckoutOrder(int id, Order order)
        {
            OrderCartRepository orderCartDB = new OrderCartRepository();
            ProductRepository productDB = new ProductRepository();


            var cartFromDB = orderCartDB.GetAll().Where(x => x.OrderID == id).ToList();
            var productFromDB = orderCartDB.GetAll();

            //var orderFromDB = orderDB.GetAll().Where(x => x.ID == id).FirstOrDefault();

            //order.CustomerName = orderFromDB.CustomerName;

            var total = (float)0;
            if (cartFromDB.Count != 0)
            {
                foreach (var item in cartFromDB)
                {
                    total += (float)item.CartAmount;
                }
                order.TotalAmount = (float)total;
            }
            else
            {
                order.TotalAmount = (float)0;
            }


            foreach (var item in cartFromDB)
            {
                if (item.Quantity > productDB.Get((int)item.ProductID).Quantity)
                {
                    return BadRequest("Some products you ordered which is not available as you desired.");
                }
            }






            if (ModelState.IsValid)
            {

                foreach (var item in cartFromDB)
                {
                    var productToDB = productDB.Get((int)item.ProductID);

                    productToDB.Quantity = productToDB.Quantity - item.Quantity;


                    productDB.Update(productToDB);
                }

                OrderRepository orderDB2 = new OrderRepository();
                orderDB2.Update(order);
                return Ok(order);
            }
            else
            {
                return BadRequest(ModelState);
            }






        }








    }
}
