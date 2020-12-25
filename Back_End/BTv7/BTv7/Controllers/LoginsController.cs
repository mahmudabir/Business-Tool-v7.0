﻿using BTv7.Models;
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




        [Route("", Name = "GetUsers"), BasicAuthentication]
        public IHttpActionResult GetUsers()
        {

            var result = loginDB.GetAll();



            return Ok(result);
        }





        [Route("", Name = "UserRegistration")]
        public IHttpActionResult PostRegister(Login login)
        {
            login.AccessStatusID = 2;
            login.RegistrationStatusID = 1;
            login.UserDesignationID = 5;

            if (ModelState.IsValid)
            {
                loginDB.Insert(login);
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
                return BadRequest(ModelState);
            }
        }
    }
}
