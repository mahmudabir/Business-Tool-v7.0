using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Reflection;
using System.Web;

namespace BTv7.Models
{
    public static class LinkExtensions
    {
        public static dynamic AddLinks<T>(this T content, params object[] links)
        {
            IDictionary<string, object> result = new ExpandoObject();

            typeof(T)
                .GetProperties(BindingFlags.Public | BindingFlags.Instance)
                .ToList()
                .ForEach(_ => result[_.Name] = _.GetValue(content));

            result["links"] = links;

            return result;
        }
    }
}