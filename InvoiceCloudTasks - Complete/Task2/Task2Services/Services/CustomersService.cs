using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.OleDb;
using System.Data;
using System.Configuration;
using System.Text;
using System.Threading.Tasks;
using Task1Services.Entities;
using System.Web.Hosting;

namespace Task1Services.Services
{
    public interface ICustomersService
    {
        List<Customer> GetCustomers();
        Customer GetCustomer(int CustomerID);
        void AddCustomer(string name, string address, string city, string state, string zip);
        void UpdateCustomer(int CustomerID, string name, string address, string city, string state, string zip);
        void DeleteCustomer(int CustomerID);
    }
    public class CustomersService : ICustomersService
    {
        string connectionString = "Provider=Microsoft.Jet.OLEDB.4.0; Data Source=" + HostingEnvironment.ApplicationPhysicalPath + "App_Data\\CustomersDb.mdb";
        public List<Customer> GetCustomers()
        {
            OleDbConnection conn = new OleDbConnection(connectionString);
            conn.Open();

            String OleDb = "SELECT * FROM Customers";


            using (OleDbCommand cmd = new OleDbCommand(OleDb, conn))
            {
                using (OleDbDataReader reader = cmd.ExecuteReader())
                {
                    var dataTable = new DataTable();
                    dataTable.Load(reader);
                    conn.Close();

                    string JSONString = string.Empty;
                    JSONString = JsonConvert.SerializeObject(dataTable);
                    return JsonConvert.DeserializeObject<List<Customer>>(JSONString);
                }
            }
        }

        public Customer GetCustomer(int CustomerID)
        {
            OleDbConnection conn = new OleDbConnection(connectionString);
            conn.Open();

            String OleDb = "SELECT * FROM Customers WHERE CustomerID = " + CustomerID;

            using (OleDbCommand cmd = new OleDbCommand(OleDb, conn))
            {
                using (OleDbDataReader reader = cmd.ExecuteReader())
                {
                    var dataTable = new DataTable();
                    dataTable.Load(reader);
                    conn.Close();

                    string JSONString = string.Empty;
                    JSONString = JsonConvert.SerializeObject(dataTable);
                    List<Customer> customers = JsonConvert.DeserializeObject<List<Customer>>(JSONString);
                    return customers[0];
                }
            }
        }

        public void AddCustomer(string name, string address, string city, string state, string zip)
        {
            OleDbConnection conn = new OleDbConnection(connectionString);
            conn.Open();

            String OleDb = "INSERT INTO Customers (Name, Address, City, State, Zip) " +
                            "VALUES ('" + name + "', '" + address + "', '" + city + "', '" + state + "', '" + zip + "');";

            using (OleDbCommand cmd = new OleDbCommand(OleDb, conn))
            {
                cmd.ExecuteNonQuery();
                conn.Close();
            }

        }

        public void UpdateCustomer(int CustomerID, string name, string address, string city, string state, string zip)
        {
            OleDbConnection conn = new OleDbConnection(connectionString);
            conn.Open();

            String OleDb = "UPDATE Customers " +
                           "SET Name = '" + name + "', Address = '" + address + "', City = '" + city + "', State = '" + state + "', Zip = '" + zip + "' " +
                           "WHERE CustomerID = " + CustomerID;

            using (OleDbCommand cmd = new OleDbCommand(OleDb, conn))
            {
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public void DeleteCustomer(int CustomerID)
        {
            OleDbConnection conn = new OleDbConnection(connectionString);
            conn.Open();

            String OleDb = "DELETE from Customers " +
                           "WHERE CustomerID = " + CustomerID;

            using (OleDbCommand cmd = new OleDbCommand(OleDb, conn))
            {
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }
    }
}
