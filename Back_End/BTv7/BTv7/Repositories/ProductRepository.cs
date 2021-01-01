using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class ProductRepository : Repository<Product>
    {
        public List<Product> GetAvailableProducts()
        {
            return this.GetAll().Where(x => x.Quantity > 0 || x.ProductTypeID == 1).ToList();
        }


        public List<Product> ProductSearch(string search)
        {
            return this.GetAll().Where(x => x.ProductType.Type.ToLower().Contains(search.ToLower()) || x.Name.ToLower().Contains(search.ToLower())).ToList();
        }

        
        public List<Product> GetAllAvailableProducts()
        {
            return this.GetAll().Where(x => x.Quantity > 0 && x.ProductStatusID == 1).ToList();
        }
    }
}