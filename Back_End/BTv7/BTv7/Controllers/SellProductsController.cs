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

            //ordercart.ID = ordercart.ID;
           //ordercart.Order.CustomerID = 0;
            //ordercart.Quantity = ordercart.Quantity;
            //ordercart.OrderID = ordercart.OrderID;
            //ordercart.Order = ordercart.Order;
            //ordercart.Product = ordercart.Product;
            //ordercart.ProductID = ordercart.ProductID;
            cartrepo.Insert(ordercart);
            return Created("api/sellproducts/" + ordercart.ID, ordercart);

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


    }
}
