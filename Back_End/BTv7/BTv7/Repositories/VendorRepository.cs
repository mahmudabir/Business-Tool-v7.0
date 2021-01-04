using BTv7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTv7.Repositories
{
    public class VendorRepository : Repository<Vendor>
    {
        public List<Vendor> GetByName(string id)
        {
            return this.context.Set<Vendor>().Where(x => x.Name.ToLower().Contains(id.ToLower())).ToList();
        }

        public List<Vendor> GetVendorByID(int id)
        {
            return this.context.Set<Vendor>().Where(x => x.ID == id).ToList();
        }

        public Vendor GetVendorByLoginID(int loginID)
        {
            List<Vendor> userFromDB = this.GetAll();
            return userFromDB.FirstOrDefault(x => x.LoginID.Equals(loginID));
        }

        public void UpdateVendorDetails(Vendor vendor)
        {
            using (var vendorr = new BTv7DbContext())
            {
                vendorr.Database.ExecuteSqlCommand("UPDATE Vendors SET Name = '" + vendor.Name + "' WHERE ID = " + vendor.ID + ";");
            }

        }

    }
}