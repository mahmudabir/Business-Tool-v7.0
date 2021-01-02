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
    [RoutePrefix("api/vendors")]
    public class VendorsController : ApiController
    {
        private VendorRepository vendorDB = new VendorRepository();

        [Route("", Name = "GetVendors")]
        [BasicAuthentication]
        public IHttpActionResult GetVendors()
        {
            var vendorFromDB = vendorDB.GetAll();
            if (vendorFromDB.Count != 0)
            {
                return Ok(vendorFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("name/{name}", Name = "GetVendorsByName")]
        [BasicAuthentication]
        public IHttpActionResult GetVendorsByName(string name)
        {
            var vendorFromDB = vendorDB.GetByName(name);

            if (vendorFromDB != null || vendorFromDB.Count != 0)
            {
                return Ok(vendorFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("id/{id}", Name = "GetVendorsByID")]
        [BasicAuthentication]
        public IHttpActionResult GetVendorsByID(int id)
        {
            var vendorFromDB = vendorDB.GetVendorByID(id);

            if (vendorFromDB != null || vendorFromDB.Count != 0)
            {
                return Ok(vendorFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }



        [Route("{id}", Name = "GetVendorByID")]
        [BasicAuthentication]
        public IHttpActionResult GetVendorByID(int id)
        {
            var vendorFromDB = vendorDB.Get(id);
            if (vendorFromDB != null)
            {
                var result = vendorFromDB.AddLinks(
                    new HyperMedia { Href = Url.Link("GetVendorByID", new { id = id }), Method = "GET", Rel = "Get one vendor by ID." },
                    new HyperMedia { Href = Url.Link("GetVendors", null), Method = "GET", Rel = "Get all vendor." },
                    new HyperMedia { Href = Url.Link("VendorRegistration", null), Method = "POST", Rel = "Create new vendor." }//,
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




        [Route("register", Name = "VendorRegistration")]
        public IHttpActionResult PostRegister(Vendor vendor)
        {
            vendor.JoinDate = DateTime.Now;


            if (ModelState.IsValid)
            {
                vendorDB.Insert(vendor);

                var vendorFromDB = vendorDB.GetVendorByLoginID(vendor.LoginID);



                var result = vendorFromDB.AddLinks(
                new HyperMedia
                {
                    Rel = "Get one customer by ID",
                    Href = Url.Link("GetVendorByID", new { id = vendorFromDB.ID }),
                    Method = "GET"
                }
                );



                string uri = Url.Link("GetVendorByID", new { id = vendorFromDB.ID });

                return Created(uri, result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}
