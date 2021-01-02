using BTv7.Models;
using BTv7.Models.ViewModel;
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

        [Route("all", Name = "GetAllProducts")]
        public IHttpActionResult GetAll()
        {
            var productsFromDB = productDB.GetAll();
            if (productsFromDB.Count != 0)
            {
                return Ok(productsFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        //Search By Company Name
        [Route("name/{name}", Name = "GetProductsByName")]
        [BasicAuthentication]
        public IHttpActionResult GetProductsByName(string name)
        {
            var productFromDB = productDB.GetByName(name);

            if (productFromDB != null || productFromDB.Count != 0)
            {
                return Ok(productFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        //Accept All
        [Route("pending/acceptAll", Name = "AproveAll")]
        [BasicAuthentication]
        public IHttpActionResult PutAproveAll()
        {
            productDB.AproveAllProduct();

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

        //Accept
        [Route("pending/accept/{id}", Name = "Aprove")]
        [BasicAuthentication]
        public IHttpActionResult PutAprove([FromUri] int id)
        {
            productDB.AproveProduct(id);

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

        //Reject
        [Route("pending/reject/{id}", Name = "Reject")]
        [BasicAuthentication]
        public IHttpActionResult Delete([FromUri] int id)
        {
            productDB.RejectProduct(id);
            return StatusCode(HttpStatusCode.NoContent);
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

        [Route("id/{id}", Name = "GetProductsByID")]
        [BasicAuthentication]
        public IHttpActionResult GetCustomersByID(int id)
        {
            var productFromDB = productDB.GetProductsByID(id);

            if (productFromDB != null || productFromDB.Count() != 0)
            {
                return Ok(productFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }


        [Route("search/", Name = "PostProductSearch"), BasicAuthentication]
        public IHttpActionResult PostProductSearch(SearchProduct searchProduct)
        {
            var productFromDB = new List<Product>();
            if (searchProduct.search == "" || searchProduct.search == null)
            {
                productFromDB = productDB.GetAll();
                if (searchProduct.high > 0)
                {
                    if (searchProduct.sort == "aprice")
                    {
                        return Ok(productFromDB
                            .OrderBy(o => o.SellPrice)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else if (searchProduct.sort == "dprice")
                    {
                        return Ok(productFromDB
                            .OrderByDescending(o => o.SellPrice)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else if (searchProduct.sort == "adate")
                    {
                        return Ok(productFromDB
                            .OrderBy(o => o.ID)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else if (searchProduct.sort == "ddate")
                    {
                        return Ok(productFromDB
                            .OrderByDescending(o => o.ID)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else
                    {
                        return Ok(productFromDB
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                }
                else
                {
                    if (searchProduct.sort == "aprice")
                    {
                        return Ok(productFromDB.OrderBy(o => o.SellPrice));
                    }
                    else if (searchProduct.sort == "dprice")
                    {
                        return Ok(productFromDB.OrderByDescending(o => o.SellPrice));
                    }
                    else if (searchProduct.sort == "adate")
                    {
                        return Ok(productFromDB.OrderBy(o => o.ID));
                    }
                    else if (searchProduct.sort == "ddate")
                    {
                        return Ok(productFromDB.OrderByDescending(o => o.ID));
                    }
                    else
                    {
                        return Ok(productFromDB);
                    }
                }
            }
            else
            {
                productFromDB = productDB.ProductSearch(searchProduct.search.ToString());
            }



            if (searchProduct.low >= searchProduct.high)
            {
                searchProduct.high = searchProduct.low;
            }

            if (productFromDB.Count != 0)
            {
                if (searchProduct.high <= 0)
                {


                    if (searchProduct.sort == "aprice")
                    {
                        return Ok(productFromDB.OrderBy(o => o.SellPrice));
                    }
                    else if (searchProduct.sort == "dprice")
                    {
                        return Ok(productFromDB.OrderByDescending(o => o.SellPrice));
                    }
                    else if (searchProduct.sort == "adate")
                    {
                        return Ok(productFromDB.OrderBy(o => o.ID));
                    }
                    else if (searchProduct.sort == "ddate")
                    {
                        return Ok(productFromDB.OrderByDescending(o => o.ID));
                    }
                    else
                    {
                        return Ok(productFromDB);
                    }
                }
                else
                {
                    if (searchProduct.sort == "aprice")
                    {
                        return Ok(productFromDB
                            .OrderBy(o => o.SellPrice)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else if (searchProduct.sort == "dprice")
                    {
                        return Ok(productFromDB
                            .OrderByDescending(o => o.SellPrice)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else if (searchProduct.sort == "adate")
                    {
                        return Ok(productFromDB
                            .OrderBy(o => o.ID)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else if (searchProduct.sort == "ddate")
                    {
                        return Ok(productFromDB
                            .OrderByDescending(o => o.ID)
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                    else
                    {
                        return Ok(productFromDB
                            .Where(x => x.SellPrice >= (int)searchProduct.low && x.SellPrice <= (int)searchProduct.high));
                    }
                }
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }


        //ENABLE AND DISABLE PRODUCTS
        [Route("disable/vendor/{id}", Name = "DisableProduct")]
        [BasicAuthentication]
        public IHttpActionResult PutDisableProduct([FromUri] int id)
        {
            productDB.DisableProduct(id);

            var product = productDB.GetProductByVendorID(id);

            return Ok(product);
        }

        [Route("enable/vendor/{id}", Name = "EnableProduct")]
        [BasicAuthentication]
        public IHttpActionResult PutEnableProduct([FromUri] int id, [FromBody] Login login)
        {
            productDB.EnableProduct(id);

            var product = productDB.GetProductByVendorID(id);

            return Ok(product);
        }



        //insert product

        [Route("add", Name = "AddProduct")]
        [BasicAuthentication]
        public IHttpActionResult PostProduct(Product product)
        {

            if (ModelState.IsValid)
            {
                productDB.Insert(product);

                var productFromDB = productDB.Get(product.ID);



                var result = productFromDB.AddLinks(
                new HyperMedia
                {
                    Rel = "Get one customer by ID",
                    Href = Url.Link("GetProductByID", new { id = productFromDB.ID }),
                    Method = "GET"
                }
                );



                string uri = Url.Link("GetProductByID", new { id = productFromDB.ID });

                return Created(uri, result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        //insert product
    }
}
