using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Task1API.Models
{
    public class CustomerModel
    {
        public virtual int CustomerID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Address { get; set; }
        public virtual string City { get; set; }
        public virtual string State { get; set; }
        public virtual string Zip { get; set; }

    }
}