using API.Data;
using API.Entities;
using API.Extensions;
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
            string? orderBy,
            string? searchTerm
            )
        {
            var query=context.Products
            .Search(searchTerm)
            .Sort(orderBy)
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
