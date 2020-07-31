using BoilerPlateApiApp.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace BoilerPlateApiApp.Controllers
{
    [Produces("application/json")]
    [Route("api/ProductCategories")]
    public class ProductCategoryController : Controller
    {
        [HttpGet]
        public List<ProductCategory> GetProductCategories()
        {
            return PrepareProductCategories();
        }

        [HttpGet("{id}")]
        public ProductCategory GetProductCategory(int id)
        {
            Thread.Sleep(1000);
            return PrepareProductCategories().Find(elem => elem.Id == id);
        }

        private List<ProductCategory> PrepareProductCategories()
        {
            var productCategories = new List<ProductCategory>();
            var productCategory05 = new ProductCategory()
            {
                Name = "Auto Mobile",
                Id = 4,
            };
            productCategories.Add(productCategory05);

            var productCategory1 = new ProductCategory()
            {
                Name = "Electronics",
                Id = 3,
            };
            productCategories.Add(productCategory1);

            var productCategory2 = new ProductCategory()
            {
                Name = "Kitchen Appliances",
                Id = 2,
            };
            productCategories.Add(productCategory2);

            var productCategor1y = new ProductCategory()
            {
                Name = "Grocery",
                Id = 1,
            };
            productCategories.Add(productCategor1y);

            var productCategory0 = new ProductCategory()
            {
                Name = "Select",
                Id = 0,
            };
            productCategories.Add(productCategory0);


            productCategories = productCategories.OrderBy(elem => elem.Id).ToList();
            return productCategories;
        }
    }
}