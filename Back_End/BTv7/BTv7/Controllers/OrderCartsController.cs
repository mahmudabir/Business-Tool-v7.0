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
    [RoutePrefix("api/carts"), BasicAuthentication]
    public class OrderCartsController : ApiController
    {
        private OrderCartRepository orderCartDB = new OrderCartRepository();


        [Route("{id}", Name = "GetCartByID"), BasicAuthentication]
        public IHttpActionResult Get(int id)
        {
            var cartFromDB = orderCartDB.Get(id);
            if (cartFromDB != null)
            {
                return Ok(cartFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("{id}"), BasicAuthentication]
        [Authorize(Roles = "CUSTOMER,SALESMAN")]
        public IHttpActionResult Post(OrderCart orderCart)
        {

            if (ModelState.IsValid)
            {
                orderCartDB.Insert(orderCart);
                var uri = Url.Link("GetCartByID", new { id = orderCart.ID });
                return Created(uri, orderCart);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
