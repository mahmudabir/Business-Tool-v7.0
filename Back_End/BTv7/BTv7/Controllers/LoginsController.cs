using BTv7.Models;
using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web.Http;

namespace BTv7.Controllers
{
    [RoutePrefix("api/logins")]
    public class LoginsController : ApiController
    {
        private LoginRepository loginDB = new LoginRepository();

        [Route("{id}", Name = "GetUserByID"), BasicAuthentication]
        public IHttpActionResult GetUserByID(int id)
        {
            var authOrNot = Thread.CurrentPrincipal.Identity.IsAuthenticated;
            var authUsername = Thread.CurrentPrincipal.Identity.Name.ToString();
            var authUserRole = Thread.CurrentPrincipal.IsInRole(null);
            var authInstanceType = Thread.CurrentPrincipal.GetType();
            var authType = Thread.CurrentPrincipal.Identity.AuthenticationType;

            var result = loginDB.Get(id).AddLinks(
                new HyperMedia { Href = Url.Link("GetUserByID", new { id = id }), Method = "GET", Rel = "Get one user by ID.", },
                new HyperMedia { Href = Url.Link("GetUsers", null), Method = "GET", Rel = "Get all users.", },
                new HyperMedia { Href = Url.Link("UserRegistration", null), Method = "POST", Rel = "Create new user.", }//,
                //new HyperMedia { Href = Url.Link("PutUser", null), Method = "PUT", Rel = "Update User" },
                //new HyperMedia { Href = Url.Link("DeleteUSer", null), Method = "DELETE", Rel = "Delete USer." }
                );



            return Ok(result);
        }

        [Route("update/employeeID/{id}", Name = "PutLoginByID")]
        [BasicAuthentication]
        public IHttpActionResult PutLoginByID([FromUri] int id, [FromBody] Login login)
        {
            /*if(ModelState.IsValid)
            {*/
            var com = loginDB.GetLoginByID(id);
            login.ID = id;
            login.Password = com.Password;
            login.AccessStatusID = com.AccessStatusID;
            login.RegistrationStatusID = com.RegistrationStatusID;
            loginDB.UpdateEmployeeLoginDetails(login);

            return Ok(login);
            /*}
            else
            {
                return BadRequest(ModelState);
            }*/

        }

        [Route("update/password/{id}", Name = "PutLogin")]
        [BasicAuthentication]
        public IHttpActionResult PutLogin([FromUri] int id, [FromBody] Login login)
        {
            /*if(ModelState.IsValid)
            {*/
            var com = loginDB.GetLoginByID(id);
            login.ID = id;
            login.AccessStatusID = com.AccessStatusID;
            login.RegistrationStatusID = com.RegistrationStatusID;
            loginDB.UpdatePassword(login);

            return Ok(login);
            /*}
            else
            {
                return BadRequest(ModelState);
            }*/

        }


        [Route("disable/user/{id}", Name = "DisableLogin")]
        [BasicAuthentication]
        public IHttpActionResult PutDisableLogin([FromUri] int id, [FromBody] Login login)
        {
            var com1 = loginDB.GetLoginByID(id);
            login.ID = id;
            login.Password = com1.Password;
            login.AccessStatusID = 2;
            login.RegistrationStatusID = com1.RegistrationStatusID;

            loginDB.DisableLogin(login);

            return Ok(login);
        }

        [Route("enable/user/{id}", Name = "EnableLogin")]
        [BasicAuthentication]
        public IHttpActionResult PutEnableLogin([FromUri] int id, [FromBody] Login login)
        {
            var com2 = loginDB.GetLoginByID(id);
            login.ID = id;
            login.Password = com2.Password;
            login.AccessStatusID = 1;
            login.RegistrationStatusID = com2.RegistrationStatusID;

            loginDB.EnableLogin(login);

            return Ok(login);
        }



        [Route("", Name = "GetUsers"), BasicAuthentication]
        public IHttpActionResult GetUsers()
        {

            var result = loginDB.GetAll();

            return Ok(result);
        }



        [Route("login", Name = "UserLogin")]
        public IHttpActionResult PostLogin(Login login)
        {


            if (loginDB.Login(login.Username, login.Password))
            {

                var loginFromDB = loginDB.GetUserDetails(login.Username, login.Password);

                var result = loginFromDB.AddLinks(
                new HyperMedia { Href = Url.Link("GetUserByID", new { id = loginFromDB.ID }), Method = "GET", Rel = "Get one user by ID.", },
                new HyperMedia { Href = Url.Link("GetUsers", null), Method = "GET", Rel = "Get all users.", },
                new HyperMedia { Href = Url.Link("UserRegistration", null), Method = "POST", Rel = "Create new user.", }//,
                //new HyperMedia { Href = Url.Link("PutUser", null), Method = "PUT", Rel = "Update User" },
                //new HyperMedia { Href = Url.Link("DeleteUSer", null), Method = "DELETE", Rel = "Delete USer." }
                );



                return Ok(result);
            }
            else
            {
                return BadRequest("Invalid Login");
            }
        }



        [Route("logout")]
        public IHttpActionResult GetLogout()
        {

            Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(""), null);
            var authOrNot = Thread.CurrentPrincipal.Identity.IsAuthenticated;
            var authUsername = Thread.CurrentPrincipal.Identity.Name.ToString();
            var authUserRole = Thread.CurrentPrincipal.IsInRole(null);
            var authInstanceType = Thread.CurrentPrincipal.GetType();
            var authType = Thread.CurrentPrincipal.Identity.AuthenticationType;
            return StatusCode(HttpStatusCode.OK);
        }



        [Route("register", Name = "UserRegistration")]
        public IHttpActionResult PostRegister(Login login)
        {
            //login.AccessStatusID = 2;
            //login.RegistrationStatusID = 1;
            //login.UserDesignationID = 5;

            /*if (ModelState.IsValid)
            {*/
            loginDB.Insert(login);
            var loginFromDB = loginDB.GetUserDetails(login.Username, login.Password);


            var result = loginFromDB.AddLinks(
            new HyperMedia { Href = Url.Link("GetUserByID", new { id = loginFromDB.ID }), Method = "GET", Rel = "Get one user by ID.", },
            new HyperMedia { Href = Url.Link("GetUsers", null), Method = "GET", Rel = "Get all users.", },
            new HyperMedia { Href = Url.Link("UserRegistration", null), Method = "POST", Rel = "Create new user.", }//,
                                                                                                                    //new HyperMedia { Href = Url.Link("PutUser", null), Method = "PUT", Rel = "Update User" },
                                                                                                                    //new HyperMedia { Href = Url.Link("DeleteUSer", null), Method = "DELETE", Rel = "Delete USer." }
            );

            string uri = Url.Link("GetUserByID", new { id = loginFromDB.ID });

            return Created(uri, result);
            /*}
            else
            {
                return BadRequest(ModelState);
            }*/
        }

        [Route("register/employee", Name = "EmployeeRegistrationInLogin")]
        [BasicAuthentication]
        public IHttpActionResult PostEmployeeRegistrationInLogin(Login login)
        {
            //login.AccessStatusID = 2;
            //login.RegistrationStatusID = 1;
            //login.UserDesignationID = 5;

            if (ModelState.IsValid)
            {
                loginDB.Insert(login);
                var loginFromDB = loginDB.GetUserDetails(login.Username, login.Password);


                var result = loginFromDB.AddLinks(
                new HyperMedia { Href = Url.Link("GetUserByID", new { id = loginFromDB.ID }), Method = "GET", Rel = "Get one user by ID.", },
                new HyperMedia { Href = Url.Link("GetUsers", null), Method = "GET", Rel = "Get all users.", },
                new HyperMedia { Href = Url.Link("EmployeeRegistrationInLogin", null), Method = "POST", Rel = "Create new user.", }//,
                //new HyperMedia { Href = Url.Link("PutUser", null), Method = "PUT", Rel = "Update User" },
                //new HyperMedia { Href = Url.Link("DeleteUSer", null), Method = "DELETE", Rel = "Delete USer." }
                );

                string uri = Url.Link("GetUserByID", new { id = loginFromDB.ID });

                return Created(uri, result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [Route("register/customer", Name = "PostCustomerRegistrationInLogin")]
        public IHttpActionResult PostCustomerRegistrationInLogin(Login login)
        {
            //login.AccessStatusID = 2;
            //login.RegistrationStatusID = 1;
            //login.UserDesignationID = 5;

            if (ModelState.IsValid)
            {
                loginDB.Insert(login);
                var loginFromDB = loginDB.GetUserDetails(login.Username, login.Password);


                var result = loginFromDB.AddLinks(
                new HyperMedia { Href = Url.Link("GetUserByID", new { id = loginFromDB.ID }), Method = "GET", Rel = "Get one user by ID.", },
                new HyperMedia { Href = Url.Link("GetUsers", null), Method = "GET", Rel = "Get all users.", },
                new HyperMedia { Href = Url.Link("PostCustomerRegistrationInLogin", null), Method = "POST", Rel = "Create new user.", }//,
                //new HyperMedia { Href = Url.Link("PutUser", null), Method = "PUT", Rel = "Update User" },
                //new HyperMedia { Href = Url.Link("DeleteUSer", null), Method = "DELETE", Rel = "Delete USer." }
                );

                string uri = Url.Link("GetUserByID", new { id = loginFromDB.ID });

                return Created(uri, result);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        //Accept All
        [Route("pending/acceptAll/customers", Name = "AproveAllCustomer")]
        [BasicAuthentication]
        public IHttpActionResult PutAproveAllCustomer()
        {
            loginDB.AproveAllPendingCustomers();

            var loginsFromDB = loginDB.GetAll();

            if (loginsFromDB.Count != 0)
            {
                return Ok(loginsFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("pending/accept/user/{id}", Name = "AproveUser")]
        [BasicAuthentication]
        public IHttpActionResult PutAproveUser([FromUri] int id)
        {
            loginDB.AproveUser(id);

            var loginsFromDB = loginDB.GetLoginByID(id);

            if (loginsFromDB != null)
            {
                return Ok(loginsFromDB);
            }
            else
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
        }

        [Route("pending/reject/user/{id}", Name = "RejectUser")]
        [BasicAuthentication]
        public IHttpActionResult DeleteRejectUser([FromUri] int id)
        {
            loginDB.Delete(id);

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
