//using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web.Http;
using Task1API.Models;
using Task1Services.Services;

namespace Task1API.Controllers
{
    public class CustomersController : ApiController
    {
        private readonly ICustomersService customersService;

        public CustomersController(ICustomersService customersService)
        {
            this.customersService = customersService;
        }
        [HttpGet]
        [ActionName("getCustomers")]
        public List<CustomerModel> GetCustomers()
        {
            var customer_results = customersService.GetCustomers();
            var customers = customer_results.AsEnumerable().Select(customer => new CustomerModel()
            {
                CustomerID = customer.CustomerID,
                Name = customer.Name,
                Address = customer.Address,
                City = customer.City,
                State = customer.State,
                Zip = customer.Zip
            });

            return customers.ToList();
        }

        [HttpGet]
        [ActionName("getCustomer")]
        public CustomerModel GetCustomer(int id)
        {
            CustomerModel customer = new CustomerModel();
            var customer_results = customersService.GetCustomer(id);
            customer.CustomerID = customer_results.CustomerID;
            customer.Name = customer_results.Name;
            customer.Address = customer_results.Address;
            customer.City = customer_results.City;
            customer.State = customer_results.State;
            customer.Zip = customer_results.Zip;

            return customer;
        }


        [HttpPost]
        [ActionName("addCustomer")]
        public void AddCustomer(JObject data)
        {
            var name = data["Name"].ToString();
            var address = data["Address"].ToString();
            var city = data["City"].ToString();
            var state = data["State"].ToString();
            var zip = data["Zip"].ToString();

            customersService.AddCustomer(name, address, city, state, zip);

        }

        [HttpPut]
        [ActionName("updateCustomer")]
        public void UpdateCustomer(JObject data)
        {
            var CustomerID = Int32.Parse(data["CustomerID"].ToString());
            var name = data["Name"].ToString();
            var address = data["Address"].ToString();
            var city = data["City"].ToString();
            var state = data["State"].ToString();
            var zip = data["Zip"].ToString();

            customersService.UpdateCustomer(CustomerID, name, address, city, state, zip);
        }

        [HttpPost]
        [ActionName("deleteCustomer")]
        public void DeleteCustomer(JObject data)
        {
            var CustomerID = Int32.Parse(data["CustomerID"].ToString());

            customersService.DeleteCustomer(CustomerID);
        }
    }
}
