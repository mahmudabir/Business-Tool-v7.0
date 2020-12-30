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
        [Route("{id}", Name = "GetAllOrder")]
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

        [Route("{uid}/{oid}", Name = "GetOrderCartByEmpID")]
        [BasicAuthentication]
        public IHttpActionResult GetUser([FromUri] int uid, [FromUri] int oid)
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

    }
}
