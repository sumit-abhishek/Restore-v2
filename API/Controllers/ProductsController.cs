using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context) : BaseApiController
    {
        private readonly StoreContext context = context;

        [HttpGet]
        public async Task <ActionResult<List<Product>>> GetProducts(
            [FromQuery] ProductParams productParams
            )
        {
            var query=context.Products
            .Search(productParams.SearchTerm)
            .Sort(productParams.OrderBy)
            .Filter(productParams.Brands,productParams.Types)
            .AsQueryable();      
            return await query.ToListAsync();
        }

        [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        var product = await context.Products.FindAsync(id);
        if(product == null) return NotFound();
        return product;
    }
    }
}
