using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTv7.Controllers
{
    public class SaleRecordController : ApiController
    {
        SaleRecordRepository saleRecordRepository = new SaleRecordRepository();

        [Route("api/SaleRecords")]
        public IHttpActionResult Get()
        {
            return Ok(saleRecordRepository.GetAll());
        }
    }
}
