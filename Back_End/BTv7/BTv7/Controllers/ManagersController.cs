using BTv7.Repositories;
using System;
using System.Collections.Generic;
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
    }
}
