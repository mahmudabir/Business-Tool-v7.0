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


        [Route("", Name = "GetCustomers")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomers()
        {
            var customerFromDB = customerDB.GetAll();
            if (customerFromDB != null)
            {
                return Ok(customerFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }


        [Route("", Name = "CustomerRegistration")]
        [BasicAuthentication, Authorize(Roles = "CUSTOMER")]
        public IHttpActionResult PostRegister(Customer customer)
        {
            LoginRepository loginDB = new LoginRepository();
            var loginFromDB = loginDB.GetUserByUsername(Thread.CurrentPrincipal.Identity.Name.ToString());

            Customer customerToDB = new Customer();

            customerToDB.Name = customer.Name;
            customerToDB.JoinDate = DateTime.Now;

            customerToDB.LoginID = loginFromDB.ID;
            //var identity = (ClaimsIdentity)User.Identity;
            //customerToDB.AddeddBy = Convert.ToInt32(identity.Claims.FirstOrDefault(x => x.Type == "ID").Value);

            if (ModelState.IsValid)
            {
                customerDB.Insert(customerToDB);

                var customerFromDB = customerDB.GetCustomerByLoginID(customerToDB.LoginID);



                var result = customerFromDB.AddLinks(
                new HyperMedia
                {
                    Rel = "Get one customer by ID",
                    Href = Url.Link("GetCustomerByID", new { id = customerFromDB.ID }),
                    Method = "GET"
                }
                );



                return Ok(result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
