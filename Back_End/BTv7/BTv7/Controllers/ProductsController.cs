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
    [RoutePrefix("api/products"), BasicAuthentication]
    public class ProductsController : ApiController
    {
        private ProductRepository productDB = new ProductRepository();

        [Route("", Name = "GetProducts")]
        public IHttpActionResult Get()
        {
            var productsFromDB = productDB.GetAvailableProducts();
            if (productsFromDB.Count != 0)
            {
                return Ok(productsFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("{id}", Name = "GetProductByID")]
        public IHttpActionResult Get(int id)
        {
            var productFromDB = productDB.Get(id);
            if (productFromDB != null)
            {
                var result = productFromDB.AddLinks(
                    new HyperMedia { Href = Url.Link("GetProducts", null), Rel = "Get all products", Method = "GET" },
                    new HyperMedia { Href = Url.Link("GetProductByID", new { id = id }), Rel = "Get product by ID", Method = "GET" }
                        );
                return Ok(result);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }


        [Route("search/{s}", Name = "GetProductSearch"), BasicAuthentication]
        public IHttpActionResult GetPostSearch(string s = "")
        {
            var productFromDB = productDB.ProductSearch(s);

            if (productFromDB.Count != 0)
            {
                return Ok(productFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }


    }
}
