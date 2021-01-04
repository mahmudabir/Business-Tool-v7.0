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
    [RoutePrefix("api/sellproducts")]
    public class SellProductsController : ApiController
    {
        [Route("availableproducts", Name ="GetAllAvailableProducts")]
        [BasicAuthentication]
        public IHttpActionResult Get()
        {
            ProductRepository prodrepo = new ProductRepository();
            var product=prodrepo.GetAllAvailableProducts();
            if (product.Count() != 0)
            {
                return Ok(product);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("{id}/uncheckedorder", Name = "GetAllUncheckedOrders")]
        [BasicAuthentication]
        public IHttpActionResult Getorder(int id)
        {
            OrderRepository orderrepo = new OrderRepository();
            var order = orderrepo.GetAllUncheckedOrders(id);
            if (order.Count() != 0)
            {
                return Ok(order);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("{id}/cart", Name = "GetAllCarts")]
        [BasicAuthentication]
        public IHttpActionResult Getcart(int id)
        {
            OrderCartRepository cartrepo = new OrderCartRepository();
            var cart = cartrepo.GetCartsByOrderID(id);
            if(cart.Count() != 0)
            {
                return Ok(cart);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            
        }

        [Route("", Name = "InsertNewProductInOrderCart")]
        [BasicAuthentication]
        public IHttpActionResult Post([FromBody]OrderCart ordercart)
        {
            OrderCartRepository cartrepo = new OrderCartRepository();
            if (ModelState.IsValid)
            {
                cartrepo.Insert(ordercart);
                return Created("api/sellproducts/" + ordercart.ID, ordercart);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }

        [Route("product/{pid}", Name = "GetProdByProductID")]
        [BasicAuthentication]
        public IHttpActionResult GetProduct(int pid)
        {
            ProductRepository prodrepo = new ProductRepository();
            var productList = prodrepo.Get(pid);

            if (productList != null)
            {
                return Ok(productList);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("{pid}/product", Name = "UpdateQuantity")]
        [BasicAuthentication]
        public IHttpActionResult Put( [FromUri] int pid, [FromBody] Product product)
        {
            ProductRepository prodrepo = new ProductRepository();
            product.ID = pid;
            product.ProductTypeID = product.ProductTypeID;
            prodrepo.Update(product);

            return Ok(product);
        }
        [Route("{oid}/order", Name = "UpdateOrder")]
        [BasicAuthentication]
        public IHttpActionResult Putorder([FromUri] int oid, [FromBody] Order order)
        {
            OrderRepository orderrepo = new OrderRepository();
            SaleRecordRepository salerepo = new SaleRecordRepository();
            SaleRecord sale = new SaleRecord();
            order.ID = oid;
            order.OrderStatusID = order.OrderStatusID;
            order.Date = DateTime.Now;
            orderrepo.Update(order);
            if (order.OrderStatusID == 4)
            {
                sale.TotalAmount = order.TotalAmount;
                sale.Date = order.Date;
                sale.OrderID = order.ID;
                salerepo.Insert(sale);
            }
            return Ok(order);

        }


        [Route("{id}/orderadd", Name = "InsertNewOrder")]
        [BasicAuthentication]
        public IHttpActionResult PostNewOrder([FromBody] Order order)
        {
            OrderRepository orderrepo = new OrderRepository();
            order.Date = DateTime.Now;
            
                orderrepo.Insert(order);
                return Created("api/sellproducts/" + order.ID, order);
           

        }

        [Route("product/{id}", Name = "GetProductProductID")]
        [BasicAuthentication]
        public IHttpActionResult GetProductById([FromUri] int pid)
        {
            ProductRepository prodrepo = new ProductRepository();
            var productFromDB = prodrepo.GetProductsByID(pid);
            if (productFromDB != null)
            {
                return Ok(productFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        //[Route("{id}", Name = "DeleteOrderByID")]
        //[BasicAuthentication]
        //public IHttpActionResult Delete(int id)
        //{
        //    OrderRepository orderrepo = new OrderRepository();
        //    OrderCartRepository cartrepo = new OrderCartRepository();
        //    var cartFromDB = cartrepo.GetCartsByOrderID(id);
        //    foreach (var item in cartFromDB)
        //    {
        //        cartrepo.Delete(item.ID);
        //    }
        //    orderrepo.Delete(id);
        //    return StatusCode(HttpStatusCode.NoContent);


        //}


        [Route("deleteProduct/{id}", Name = "DeleteProductByID")]
        [BasicAuthentication]
        public IHttpActionResult Delete(int id)
        {
            OrderCartRepository orderCartrepo = new OrderCartRepository();
            orderCartrepo.Delete(id);
            return StatusCode(HttpStatusCode.NoContent);
            


        }


        [Route("orderCart/{id}", Name = "GetOrderCartOrderById")]
        [BasicAuthentication]
        public IHttpActionResult GetOrderCartOrderById( int id)
        {
            OrderCartRepository cartrepo = new OrderCartRepository();
            var cartFromDB=cartrepo.GetCartsByOrderID(id);
            if (cartFromDB.Count() != 0)
            {
                return Ok(cartFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("orderCartproduct/{oid}/{pid}", Name = "GetOrderCartByOrderIdNProductId")]
        [BasicAuthentication]
        public IHttpActionResult GetOrderCartByOrderIdNProductId(int oid,int pid)
        {
            OrderCartRepository cartrepo = new OrderCartRepository();
            var cartFromDB = cartrepo.GetCartsByOrderIDNProductID(oid,pid);
            if (cartFromDB.Count() != 0)
            {
                return Ok(cartFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("orderCartUpdate/{id}", Name = "PutnewProductinOrderCartToUpdateQuantity")]
        [BasicAuthentication]
        public IHttpActionResult PutnewProduct([FromUri] int id, [FromBody] OrderCart ordercart)
        {
            OrderCartRepository cartrepo = new OrderCartRepository();
            ordercart.ID = id;
            
            cartrepo.Update(ordercart);

            return Ok(ordercart);
        }



        [Route("{id}/total_sell/reports", Name = "GetReportOfSellBySalesmanID")]
        [BasicAuthentication]
        public IHttpActionResult GetReportOfSellBySalesmanID(int id)
        {
            OrderRepository orderDB = new OrderRepository();
            List<object> iData = new List<object>();

            //Creating sample data  
            DataTable dt = new DataTable();
            dt.Columns.Add("Type", System.Type.GetType("System.String"));
            dt.Columns.Add("Count", System.Type.GetType("System.Int32"));

            DataRow dr = dt.NewRow();
            dr["Type"] = "Total Sold";
            dr["Count"] = orderDB.GetSellBySalesmanID(id).Count;
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["Type"] = "Top Sold";
            dr["Count"] = orderDB.GetTopSellBySalesmanID(id).Count;
            dt.Rows.Add(dr);

            dr = dt.NewRow();
            dr["Type"] = "Poor Sold";
            dr["Count"] = orderDB.GetPoorSellBySalesmanID(id).Count;
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
