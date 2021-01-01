using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/customers")]
    public class CustomersController : ApiController
    {
        private CustomerRepository customerDB = new CustomerRepository();

        [Route("{id}", Name = "GetCustomerByID")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomerByID(int id)
        {
            var customerFromDB = customerDB.Get(id);
            if (customerFromDB != null)
            {
                var result = customerFromDB.AddLinks(
                    new HyperMedia { Href = Url.Link("GetCustomerByID", new { id = id }), Method = "GET", Rel = "Get one customer by ID." },
                    new HyperMedia { Href = Url.Link("GetCustomers", null), Method = "GET", Rel = "Get all customers." },
                    new HyperMedia { Href = Url.Link("CustomerRegistration", null), Method = "POST", Rel = "Create new customer." }//,
                    //new HyperMedia { Href = Url.Link("PutCustomer", null), Method = "PUT", Rel = "Update Customer" },
                    //new HyperMedia { Href = Url.Link("DeleteCustomer", null), Method = "DELETE", Rel = "Delete customer." }
                    );
                return Ok(result);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("id/{id}", Name = "GetCustomersByID")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomersByID(int id)
        {
            var customerFromDB = customerDB.GetCustomerByID(id);

            if (customerFromDB != null || customerFromDB.Count() != 0)
            {
                return Ok(customerFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("", Name = "GetCustomers")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomers()
        {
            var customerFromDB = customerDB.GetAll();
            if (customerFromDB.Count != 0)
            {
                return Ok(customerFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("update/customerID/{id}", Name = "PutCustomerByID")]
        [BasicAuthentication]
        public IHttpActionResult PutCustomerByID([FromUri] int id, [FromBody] Customer customer)
        {
            if(ModelState.IsValid)
            {
                var com = customerDB.GetCustomerByID(id);
                customer.ID = id;
                customer.Image = com[0].Image;
                customer.ApprovedBy = com[0].ApprovedBy;
                customer.Address = com[0].Address;
                customer.LoginID = com[0].LoginID;
                customer.JoinDate = com[0].JoinDate;
                customerDB.UpdateCustomerDetails(customer);

                return Ok(customer);
            }
            else
            {
                return BadRequest(ModelState);
            }
            

        }





        [Route("register", Name = "CustomerRegistration")]
        [BasicAuthentication, Authorize(Roles = "CUSTOMER")]
        public IHttpActionResult PostRegister(Customer customer)
        {
            LoginRepository loginDB = new LoginRepository();
            var loginFromDB = loginDB.GetUserByUsername(Thread.CurrentPrincipal.Identity.Name.ToString());

            //Customer customerToDB = new Customer();

            //customerToDB.Name = customer.Name;
            customer.JoinDate = DateTime.Now;

            customer.LoginID = loginFromDB.ID;
            //var identity = (ClaimsIdentity)User.Identity;
            //customerToDB.AddeddBy = Convert.ToInt32(identity.Claims.FirstOrDefault(x => x.Type == "ID").Value);

            if (ModelState.IsValid)
            {
                customerDB.Insert(customer);

                var customerFromDB = customerDB.GetCustomerByLoginID(customer.LoginID);



                var result = customerFromDB.AddLinks(
                new HyperMedia
                {
                    Rel = "Get one customer by ID",
                    Href = Url.Link("GetCustomerByID", new { id = customerFromDB.ID }),
                    Method = "GET"
                }
                );



                string uri = Url.Link("GetCustomerByID", new { id = customerFromDB.ID });

                return Created(uri, result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Route("name/{name}", Name = "GetCustomersByName")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomersByName(string name)
        {
            var customerFromDB = customerDB.GetByName(name);

            if (customerFromDB != null || customerFromDB.Count != 0)
            {
                return Ok(customerFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("{cid}/feedbacks", Name = "GetFeedbackByCustomerID"), BasicAuthentication]
        [Authorize(Roles = "CUSTOMER")]
        public IHttpActionResult GetFeedbackByCustomerID(int cid)
        {
            FeedbackRepository feedbackDB = new FeedbackRepository();

            var feedbackFromDB = feedbackDB.GetFeedbackByCustomerID(cid);
            if (feedbackFromDB.Count != 0)
            {
                return Ok(feedbackFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }



        [Route("{cid}/orders", Name = "GetAllOrderByCustomerID"), BasicAuthentication]
        public IHttpActionResult GetAllOrderByCustomerID(int cid)
        {
            OrderRepository orderDB = new OrderRepository();

            var orderFromDB = orderDB.GetAllOrderByCustomerID(cid);
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }



        [Route("{cid}/orders/", Name = "PostOrderByCustomer")]
        public IHttpActionResult PostOrderByCustomer(int cid, Order order)
        {
            OrderRepository orderDB = new OrderRepository();
            CustomerRepository customerDB = new CustomerRepository();
            int loginID = customerDB.Get(cid).LoginID;
            var customerFromDB = customerDB.GetCustomerByLoginID(loginID);

            order.Date = DateTime.Now;
            order.TotalAmount = 0.0f;
            order.CustomerID = cid;


            order.CustomerName = customerFromDB.Name;
            order.Address = customerFromDB.Address;

            order.SaleTypeID = 1;
            order.IsSold = false;
            order.OrderStatusID = 6;
            order.SellBy = 1;

            if (ModelState.IsValid)
            {
                orderDB.Insert(order);
                var uri = Url.Link("GetOrderByID", new { id = order.ID });
                return Created(uri, order);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }



        [Route("{cid}/orders/{oid}", Name = "GetOrderByCustomerNOrderID"), BasicAuthentication]
        public IHttpActionResult GetOrderByCustomerNOrderID(int cid, int oid)
        {
            OrderRepository orderDB = new OrderRepository();

            var orderFromDB = orderDB.GetOrderByCustomerNOrderID(cid, oid);
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }




        [Route("{cid}/orders/status/{osid}", Name = "GetOrderByCustomerNStatusID"), BasicAuthentication]
        public IHttpActionResult GetOrderByCustomerNStatusID(int cid, int osid)
        {
            OrderRepository orderDB = new OrderRepository();

            var orderFromDB = orderDB.GetOrderByCustomerNStatusID(cid, osid);
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }


        [Route("{cid}/orders/saletype/{stid}", Name = "GetOrderByCustomerNSaleTypeID"), BasicAuthentication]
        public IHttpActionResult GetOrderByCustomerNSaleTypeID(int cid, int stid)
        {
            OrderRepository orderDB = new OrderRepository();

            var orderFromDB = orderDB.GetOrderByCustomerNSaleTypeID(cid, stid);
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }


        [Route("{cid}/orders/saletype/{stid}/orderstatus/{osid}/notissold", Name = "GetOrderByCustomerNSaleTypeNOrderStatusIDNNotIsSold"), BasicAuthentication]
        public IHttpActionResult GetOrderByCustomerNSaleTypeNOrderStatusIDNNotIsSold(int cid, int stid)
        {
            OrderRepository orderDB = new OrderRepository();
            //var orderFromDB = new List<Order>();



            if (Thread.CurrentPrincipal.IsInRole("CUSTOMER") == true)
            {
                var orderFromDB = orderDB.GetOrderByCustomerNSaleTypeID(cid, stid).Where(x => x.IsSold == false).FirstOrDefault();
                if (orderFromDB != null)
                {
                    return Ok(orderFromDB);
                }
                else
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }
            }
            else
            {
                var orderFromDB = orderDB.GetOrderByCustomerNSaleTypeID(cid, stid);
                if (orderFromDB.Count != 0)
                {
                    return Ok(orderFromDB.Where(x => x.IsSold == false));
                }
                else
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }
            }


        }


        [Route("{cid}/orders/saletype/{stid}/orderstatus/{osid}/issold", Name = "GetOrderByCustomerNSaleTypeNOrderStatusIDNIsSold"), BasicAuthentication]
        public IHttpActionResult GetOrderByCustomerNSaleTypeNOrderStatusIDNIsSold(int cid, int stid)
        {
            OrderRepository orderDB = new OrderRepository();

            var orderFromDB = orderDB.GetOrderByCustomerNSaleTypeID(cid, stid);
            if (orderFromDB.Count != 0)
            {
                return Ok(orderFromDB.Where(x => x.IsSold == true));
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }



        [Route("{cid}/orders/{oid}/items", Name = "GetCartsByCustomerNOrderID"), BasicAuthentication]
        public IHttpActionResult GetCartsByCustomerNOrderID(int cid, int oid)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int lidFromDB = Convert.ToInt32(identity.Claims.FirstOrDefault(x => x.Type == "ID").Value);

            int cidFromDB = customerDB.GetCustomerByLoginID(lidFromDB).ID;

            if (cidFromDB != cid)
            {
                return BadRequest();
            }

            OrderCartRepository orderCartDB = new OrderCartRepository();

            var cartFromDB = orderCartDB.GetCartsByCustomerNOrderID(cid, oid);

            if (cartFromDB.Count != 0)
            {
                return Ok(cartFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }

        }





        [Route("{cid}/orders/{oid}/items", Name = "PostCartsByCustomerNOrderID"), BasicAuthentication]
        public IHttpActionResult PostCartByCustomerNOrderID(int cid, int oid, OrderCart orderCart)
        {
            OrderCartRepository orderCartDB = new OrderCartRepository();
            ProductRepository productDB = new ProductRepository();

            var productFromDB = productDB.Get((int)orderCart.ProductID);


            orderCart.OrderID = oid;
            orderCart.CartAmount = orderCart.Quantity * productFromDB.SellPrice;


            if (ModelState.IsValid)
            {
                orderCartDB.Insert(orderCart);

                var uri = Url.Link("GetCartsByCustomerNOrderID", null);

                return Created(uri, orderCart);
            }
            else
            {
                return BadRequest(ModelState);
            }

        }
    }
}
