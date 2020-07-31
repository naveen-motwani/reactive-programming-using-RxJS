using BoilerPlateApiApp.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace BoilerPlateApiApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        [HttpGet]
        public List<Product> GetProducts()
        {
            //Console.Write("entered");;
            System.Diagnostics.Debug.WriteLine("entered");
            return PrepareProducts();
        }

        [HttpGet("getProduct/{id}")]
        public Product GetProduct(int id)
        {
            return PrepareProducts().FirstOrDefault(elem => elem.Id == id);
        }

        [HttpGet("searchProduct/{name}")]
        public List<Product> GetProduct(string name)
        {
            return PrepareProducts().Where(elem => elem.Name.ToLower().Contains(name.ToLower())).ToList();
        }

        private List<Product> PrepareProducts()
        {
            var products = new List<Product>();

            var product = new Product()
            {
                CategoryId = 4,
                Description = "Product description",
                Name = "Hero honda Passion",
                Id = 11,
                Price = 1000,
                supplierIds = new List<int>() { 1, 2, 3 },
            };
            products.Add(product);

            var product1 = new Product()
            {
                CategoryId = 4,
                Description = "Product description",
                Name = "Honda Activa",
                Id = 1,
                Price = 1500,
                supplierIds = new List<int>() { 1, 2, 3 },
            };
            products.Add(product1);

            var product2 = new Product()
            {
                CategoryId = 4,
                Description = "Product description",
                Name = "Yamaha FZ",
                Id = 2,
                Price = 2500,
                supplierIds = new List<int>() { 1, 2, 3 },
            };
            products.Add(product2);

            var product3 = new Product()
            {
                CategoryId = 4,
                Description = "Product description",
                Name = "Yamaha R15",
                Id = 3,
                supplierIds = new List<int>() { 1, 2, 3 },
                Price = 3000,
            };
            products.Add(product3);

            var product4 = new Product()
            {
                CategoryId = 4,
                Description = "Product description",
                Name = "Bajaj Chetak",
                Id = 4,
                Price = 800,
                supplierIds = new List<int>() { 1, 2, 3 },
            };
            products.Add(product4);

            var product5 = new Product()
            {
                CategoryId = 3,
                Description = "Product description",
                Name = "Iball 2.1",
                Id = 5,
                Price = 100,
                supplierIds = new List<int>() { 1, 2, 3 },
            };
            products.Add(product5);


            var product6 = new Product()
            {
                CategoryId = 3,
                Description = "Product description",
                Name = "Iball 5.1",
                Id = 6,
                Price = 200,
                supplierIds = new List<int>() { 1, 2, 3 },
            };
            products.Add(product6);

            var product7 = new Product()
            {
                CategoryId = 2,
                Description = "Product description",
                Name = "Dinner set",
                Id = 7,

                supplierIds = new List<int>() { 1, 2, 3 },
                Price = 100,
            };
            products.Add(product7);


            var product8 = new Product()
            {
                CategoryId = 2,
                Description = "Product description",
                Name = "Spoon",
                Id = 8,
                supplierIds = new List<int>() { 1, 2, 3 },
                Price = 1,
            };
            products.Add(product8);

            var product9 = new Product()
            {
                CategoryId = 1,
                Description = "Product description",
                Name = "Milk",
                Id = 9,
                supplierIds = new List<int>() { 1, 2, 3 },
                Price = 1,
            };
            products.Add(product9);


            var product10 = new Product()
            {
                CategoryId = 1,
                Description = "Product description",
                supplierIds = new List<int>() { 1, 2, 3 },
                Name = "Tea",
                Id = 10,
                Price = 1,
            };
            products.Add(product10);
            products = products.OrderBy(elem => elem.Id).ToList();
            return products;
        }
    }
}