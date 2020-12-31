using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/deliveryorders")]
    public class DeliveryOrdersController : ApiController
    {
        [Route("{id}", Name = "GetAllOrderByDeliverymanID")]
        [BasicAuthentication]
        public IHttpActionResult Get(int id)
        {
            OrderRepository orderrepo = new OrderRepository();
            var orderList=orderrepo.GetOrderByDeliverymanID(id);

            if (orderList.Count() != 0)
            {
                return Ok(orderList);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }


        [Route("{id}/order", Name = "GetOrderByOrderID")]
        [BasicAuthentication]
        public IHttpActionResult Getorder(int id)
        {
            OrderRepository orderrepo = new OrderRepository();
            var orderList = orderrepo.Get(id);

            if (orderList !=null)
            {
                return Ok(orderList);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }



        [Route("{uid}/{oid}", Name = "GetOrderCartByDeliverymanID")]
        [BasicAuthentication]
        public IHttpActionResult GetOrderCart([FromUri] int uid, [FromUri] int oid)
        {
            OrderCartRepository orderCartrepo = new OrderCartRepository();
            var orderFromDB = orderCartrepo.GetCartsByEmployeeNOrderID(uid,oid);
            if (orderFromDB.Count() != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("{eid}/order/{oid}", Name = "GetOrderByDeliverymanIDnStatusID")]
        [BasicAuthentication]
        public IHttpActionResult GetUser([FromUri] int eid, [FromUri] int oid)
        {
            OrderRepository orderrepo = new OrderRepository();
            var orderFromDB = orderrepo.GetOrderByDeliverymanIDNOrderIDnStatusID(eid, oid);
            if (orderFromDB != null)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("{oid}/accepted", Name = "AcceptedOrder")]
        [BasicAuthentication]
        public IHttpActionResult PutAccepted([FromUri] int oid,[FromBody] Order order)
        {
            OrderRepository orderrepo = new OrderRepository();
            order.ID = oid;

            order.Date = DateTime.Now;
            orderrepo.Update(order);
            return Ok(order);



        }


        [Route("{oid}/ordercart", Name = "GetOrderCartByOrderID")]
        [BasicAuthentication]
        public IHttpActionResult GetOrdercart(int oid)
        {
            OrderCartRepository orderCartrepo = new OrderCartRepository();
            var orderCartList = orderCartrepo.GetCartsByOrderID(oid);

            if (orderCartList.Count() != 0)
            {
                return Ok(orderCartList);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("{pid}/product", Name = "GetProductByProductID")]
        [BasicAuthentication]
        public IHttpActionResult GetProduct(int pid)
        {
            ProductRepository prodrepo = new ProductRepository();
            var productList = prodrepo.Get(pid);

            if (productList !=null)
            {
                return Ok(productList);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }


        [Route("{oid}/{pid}/rejected", Name = "RejectedOrder")]
        [BasicAuthentication]
        public IHttpActionResult PutRejected([FromUri] int oid, [FromUri] int pid, [FromBody] Product product)
        {
            //OrderRepository orderrepo = new OrderRepository();
            OrderCartRepository orderCartrepo = new OrderCartRepository();
            //ProductRepository prodrepo = new ProductRepository();

            //var orderCartData = orderCartrepo.GetCartsByOrderID(oid);
            //int quantity;

            //foreach (var item in orderCartData)
            //{
            //    var prodFromDB = prodrepo.Get((int)item.ProductID);
            //    product.ID = prodFromDB.ID;
            //    quantity = (prodFromDB.Quantity + item.Quantity);
            //    product.Quantity = quantity;
            //    product.Image = prodFromDB.Image;
            //    product.Name = prodFromDB.Name;
            //    product.BuyPrice = prodFromDB.BuyPrice;
            //    product.SellPrice = prodFromDB.SellPrice;
            //    product.ProductType = prodFromDB.ProductType;
            //    product.ProductStatus = prodFromDB.ProductStatus;
            //    product.ProductTypeID = prodFromDB.ProductTypeID;
            //    product.ProductStatusID = prodFromDB.ProductStatusID;
            //    product.Vendor = prodFromDB.Vendor;
            //    product.VendorID = prodFromDB.VendorID;
            //    product.Login = prodFromDB.Login;
            //    product.ModifiedBy = prodFromDB.ModifiedBy;

            //    prodrepo.Update(product);
            //    orderCartrepo.Delete(item.ID);

            //}



            ProductRepository prodrepo = new ProductRepository();
            product.ID = pid;
            product.ProductTypeID = product.ProductTypeID;
            prodrepo.Update(product);
            
            return Ok(product);




        }

    }
}
