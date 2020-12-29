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








    }
}
