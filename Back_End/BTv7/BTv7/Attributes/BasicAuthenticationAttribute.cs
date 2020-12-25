using BTv7.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BTv7.Models
{
    public class BasicAuthenticationAttribute : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
            }
            else
            {
                string encodedString = actionContext.Request.Headers.Authorization.Parameter;
                string decodedString = Encoding.UTF8.GetString(Convert.FromBase64String(encodedString));

                string[] splittedText = decodedString.Split(':');
                string username = splittedText[0];
                string password = splittedText[1];

                LoginRepository db = new LoginRepository();

                if (db.Login(username, password))
                {
                    var UserDetails = db.GetUserDetails(username, password);

                    var identity = new GenericIdentity(username);

                    identity.AddClaim(new Claim("Email", UserDetails.Email));
                    identity.AddClaim(new Claim(ClaimTypes.Name, UserDetails.Username));
                    identity.AddClaim(new Claim("ID", Convert.ToString(UserDetails.ID)));

                    IPrincipal principal = new GenericPrincipal(identity, new string[] { UserDetails.UserDesignation.Designation });

                    Thread.CurrentPrincipal = principal;

                    if (HttpContext.Current != null)
                    {
                        HttpContext.Current.User = principal;
                    }
                }
                else
                {
                    actionContext.Response = actionContext.Request
                        .CreateResponse(HttpStatusCode.Unauthorized);
                }
            }
        }
    }
}