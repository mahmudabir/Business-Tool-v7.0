using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/SaleRecords")]
    public class SaleRecordsController : ApiController
    {
        SaleRecordRepository saleRecordRepository = new SaleRecordRepository();

        [Route(""), BasicAuthentication]
        public IHttpActionResult Get()
        {
            return Ok(saleRecordRepository.GetAll());
        }

        [Route("{id}" , Name ="GetSearchRecordById"), BasicAuthentication]
        public IHttpActionResult GetSearchRecordById(int id)
        {
            var getById = saleRecordRepository.Get(id);
            if(getById==null)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
            else
            {
                var result = getById.AddLinks(
                    new HyperMedia { Href = Url.Link("GetSearchRecordById", new { id = id }), Method = "GET", Rel = "Get SaleRecords by ID", }
                );
                return Ok(result);
                
            }
        }

        

    }
}
