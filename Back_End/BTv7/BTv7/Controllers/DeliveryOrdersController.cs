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

        [Route("{eid}/order/{oid}", Name = "GetOrderByEmpID")]
        [BasicAuthentication]
        public IHttpActionResult GetUser([FromUri] int eid, [FromUri] int oid)
        {
            OrderRepository orderrepo = new OrderRepository();
            var orderFromDB = orderrepo.GetOrderByDeliverymanIDNOrderID(eid, oid);
            if (orderFromDB != null)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }

        [Route("{oid}", Name = "AcceptedOrder")]
        [BasicAuthentication]
        public IHttpActionResult Put([FromUri] int oid,[FromBody] Order order)
        {
            OrderRepository orderrepo = new OrderRepository();
            order.ID = oid;

            order.Date = DateTime.Now;
            orderrepo.Update(order);
            return Ok(order);



        }

    }
}
