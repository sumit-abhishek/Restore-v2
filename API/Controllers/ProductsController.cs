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
        public async Task<ActionResult<List<Product>>> GetProducts(
            [FromQuery] ProductParams productParams
            )
        {
            var query = context.Products
            .Search(productParams.SearchTerm)
            .Sort(productParams.OrderBy)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

            var product = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(product.Metadata);

            return product;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var product = await context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(x => x.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
