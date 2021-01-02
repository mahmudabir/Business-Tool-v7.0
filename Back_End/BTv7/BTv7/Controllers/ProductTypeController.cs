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
    [RoutePrefix("api/productType")]
    public class ProductTypeController : ApiController
    {
        ProductTypeRepository productDB = new ProductTypeRepository();

        [Route("", Name = "GetProductType")]
        [BasicAuthentication]
        public IHttpActionResult GetProductType()
        {

            var productTypeFromDB = productDB.GetAll();

            if (productTypeFromDB != null || productTypeFromDB.Count != 0)
            {
                return Ok(productTypeFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }
    }
}
