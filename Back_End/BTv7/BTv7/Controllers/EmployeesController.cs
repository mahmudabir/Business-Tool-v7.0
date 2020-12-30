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
    [RoutePrefix("api/employees")]
    public class EmployeesController : ApiController
    {
        EmployeeRepository employeeDB = new EmployeeRepository();

        [Route("", Name = "GetEmployees")]
        [BasicAuthentication]
        public IHttpActionResult GetEmployees()
        {

            var employeeFromDB = employeeDB.GetAll();
            if (employeeFromDB != null || employeeFromDB.Count != 0)
            {
                return Ok(employeeFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        [Route("{post_by}", Name = "GetEmployeesByName")]
        public IHttpActionResult GetEmployeesByName(string post_by)
        {
            var employeeFromDB = employeeDB.GetByName(post_by);

            if (employeeFromDB != null || employeeFromDB.Count != 0)
            {
                return Ok(employeeFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NotFound);
            }
        }

        //[Route("{id}", Name = "GetEmployeeByID")]
        //[BasicAuthentication]//, Authorize(Roles = "ADMIN,MANAGER,SALESMAN,DELIVERYMAN")]
        //public IHttpActionResult GetEmployeeByID(int id)
        //{
        //    var employeeFromDB = employeeDB.Get(id);
        //    if (employeeFromDB != null)
        //    {
        //        var result = employeeFromDB.AddLinks(
        //            new HyperMedia { Href = Url.Link("GetEmployeeByID", new { id = id }), Method = "GET", Rel = "Get one employee by ID." },
        //            new HyperMedia { Href = Url.Link("GetEmployees", null), Method = "GET", Rel = "Get all employees." },
        //            new HyperMedia { Href = Url.Link("EmployeeRegistration", null), Method = "POST", Rel = "Create new employee." }//,
        //            //new HyperMedia { Href = Url.Link("PutEmployee", null), Method = "PUT", Rel = "Update Employee" },
        //            //new HyperMedia { Href = Url.Link("DeleteEmployee", null), Method = "DELETE", Rel = "Delete Employee." }
        //            );
        //        return Ok(result);
        //    }
        //    else
        //    {
        //        return StatusCode(HttpStatusCode.NotFound);
        //    }
        //}


        //[Route("", Name = "EmployeeRegistration")]
        //[BasicAuthentication]
        //public IHttpActionResult PostRegister(Employee employee)
        //{
        //    LoginRepository loginDB = new LoginRepository();
        //    var loginFromDB = loginDB.GetUserByUsername(Thread.CurrentPrincipal.Identity.Name.ToString());

        //    Employee employeeToDB = new Employee();

        //    employeeToDB.Name = employee.Name;
        //    employeeToDB.JoinDate = DateTime.Now;
        //    employeeToDB.LoginID = loginFromDB.ID;


        //    var identity = (ClaimsIdentity)User.Identity;
        //    employeeToDB.AddeddBy = Convert.ToInt32(identity.Claims.FirstOrDefault(x => x.Type == "ID").Value);

        //    employeeToDB.Salary = employee.Salary;




        //    if (ModelState.IsValid)
        //    {
        //        employeeDB.Insert(employeeToDB);

        //        var employeeFromDB = employeeDB.GetEmployeeByLoginID(employeeToDB.LoginID);

        //        var result = employeeFromDB.AddLinks(
        //       new HyperMedia { Href = Url.Link("GetEmployeeByID", new { id = employeeFromDB.ID }), Method = "GET", Rel = "Get one employee by ID." },
        //            new HyperMedia { Href = Url.Link("GetEmployees", null), Method = "GET", Rel = "Get all employees." },
        //            new HyperMedia { Href = Url.Link("EmployeeRegistration", null), Method = "POST", Rel = "Create new employee." }//,
        //            //new HyperMedia { Href = Url.Link("PutEmployee", null), Method = "PUT", Rel = "Update Employee" },
        //            //new HyperMedia { Href = Url.Link("DeleteEmployee", null), Method = "DELETE", Rel = "Delete Employee." }
        //        );



        //        return Ok(result);
        //    }
        //    else
        //    {
        //        return BadRequest(ModelState);
        //    }
        //}
    }
}
