namespace Task1Services.Entities
{
    public class Customer
    {
        public virtual int CustomerID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Address { get; set; }
        public virtual string City { get; set; }
        public virtual string State { get; set; }
        public virtual string Zip { get; set; }

    }
}
