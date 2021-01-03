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

        public void AproveAllProduct()
        {
            using (var p2 = new BTv7DbContext())
            {
                int e = p2.Database.ExecuteSqlCommand("UPDATE Products SET ProductStatusID = '1' WHERE ProductStatusID = '3';");
            }
        }

        public void AproveProduct(int id)
        {
            using (var p2 = new BTv7DbContext())
            {
                int e = p2.Database.ExecuteSqlCommand("UPDATE Products SET ProductStatusID = '1' WHERE ProductStatusID = '3' AND ID = '"+id+"';");
            }
        }

        public void RejectProduct(int id)
        {
            using (var p2 = new BTv7DbContext())
            {
                int noOfRowDeleted = p2.Database.ExecuteSqlCommand("DELETE FROM Products WHERE ID = '" + id + "';");
            }
        }

        //ByName
        public List<Product> GetByName(string id)
        {
            return this.context.Set<Product>().Where(x => x.Name.ToLower().Contains(id.ToLower())).ToList();
        }

        //ByID
        public List<Product> GetProductsByID(int id)
        {
            return this.context.Set<Product>().Where(x => x.ID == id).ToList();
        }


        public void UpdateProductDetails(Product product)
        {
            using (var pro = new BTv7DbContext())
            {
                pro.Database.ExecuteSqlCommand("UPDATE Products SET Name = '" + product.Name + "' , Quantity= '" + product.Quantity + "' , BuyPrice= '" + product.BuyPrice + "' , SellPrice= '" + product.SellPrice + "' , ProductTypeID= '" + product.ProductTypeID + "' WHERE ID = " + product.ID + ";");
            }
        }
        public void Unavilable(Product product)
        {
            using (var pro = new BTv7DbContext())
            {
                pro.Database.ExecuteSqlCommand("UPDATE Products SET ProductStatusID = '" + product.ProductStatusID + "' WHERE ID = " + product.ID + ";");
            }
        }
    }
}