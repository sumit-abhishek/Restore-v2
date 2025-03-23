using System;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();  

        if (basket == null) NoContent();
        return new BasketDto{
            BasketId=basket.BasketId,
            Items=basket.Items.Select(x=>new BasketItemDto{
                ProductId=x.ProductId,
                Name=x.Product.Name,
                Price=x.Product.Price,
                Brand=x.Product.Brand,
                Type=x.Product.Type,
                PictureUrl=x.Product.PictureUrl,
                Quantity=x.Quantity
            }).ToList()
        };
    }

    [HttpPost]
    public async Task<ActionResult>AddItemToBasket(int productId, int quantity)
    {
        var basket =await RetrieveBasket();   //Get Basket
        
        basket ??=CreateBasket();   //Create Basket

        var product= await context.Products.FindAsync(productId);  //Get Product
        if(product==null) return BadRequest("Problem in Adding Item To Basket");

        basket.AddItem(product,quantity); //Add Product

        var result= await context.SaveChangesAsync()>0;  //Save Changes
        if(result) return CreatedAtAction(nameof(GetBasket),basket);

        return BadRequest("Problem Updating Basket");
    }


    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
        .Include(x => x.Items)
        .ThenInclude(x => x.Product)
        .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }

    private Basket CreateBasket()
    {
        var basketId= Guid.NewGuid().ToString();
        var cookieOptions= new CookieOptions
        {
            IsEssential=true,
            Expires=DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("basketId",basketId,cookieOptions);
        var basket = new Basket{BasketId=basketId};
        context.Baskets.Add(basket);
        return basket;
    }
}
