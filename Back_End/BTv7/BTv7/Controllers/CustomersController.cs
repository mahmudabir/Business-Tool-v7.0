using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
            if (customerFromDB.Count != 0)
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
    }
}
