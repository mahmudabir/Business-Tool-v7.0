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
            return Ok(product);
        }

        [Route("{id}/uncheckedorder", Name = "GetAllUncheckedOrders")]
        [BasicAuthentication]
        public IHttpActionResult Getorder(int id)
        {
            OrderRepository orderrepo = new OrderRepository();
            var order = orderrepo.GetAllUncheckedOrders(id);
            return Ok(order);
        }
    }
}
