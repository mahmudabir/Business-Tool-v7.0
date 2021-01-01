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

        public List<Product> GetProductByVendorID(int id)
        {
            return this.context.Set<Product>().Where(x => x.VendorID == id).ToList();
        }

        public void DisableProduct(int id)
        {
            using (var p1 = new BTv7DbContext())
            {
                int d = p1.Database.ExecuteSqlCommand("UPDATE Products SET ProductStatusID = '2' WHERE VendorID = " + id + ";");
            }
        }

        public void EnableProduct(int id)
        {
            using (var p2 = new BTv7DbContext())
            {
                int e = p2.Database.ExecuteSqlCommand("UPDATE Products SET ProductStatusID = '1' WHERE VendorID = " + id + ";");
            }
        }

        //ByName
        public List<Product> GetByName(string id)
        {
            return this.context.Set<Product>().Where(x => x.Name.ToLower().Contains(id.ToLower())).ToList();
        }
    }
}