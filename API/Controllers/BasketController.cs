using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();
        if(basket==null) return NoContent();
        return basket.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>>AddItemToBasket(int productId, int quantity)
    {
        var basket =await RetrieveBasket();   //Get Basket
        
        basket ??=CreateBasket();   //Create Basket

        var product= await context.Products.FindAsync(productId);  //Get Product
        if(product==null) return BadRequest("Problem in Adding Item To Basket");

        basket.AddItem(product,quantity); //Add Product

        var result= await context.SaveChangesAsync()>0;  //Save Changes
        if(result) return CreatedAtAction(nameof(GetBasket),basket.ToDto());

        return BadRequest("Problem Updating Basket");
    }

    [HttpDelete]
    public async Task<ActionResult>RemoveBAsketItem(int productId, int quantity)
    {
        var basket=await RetrieveBasket();
        if(basket==null) return BadRequest("Unable to retrieve basket");
        basket.RemoveIem(productId,quantity);
        var result= await context.SaveChangesAsync()>0;
        if(result) return Ok();
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
            Expires=DateTime.UtcNow.AddDays(30),
            Secure=true,
            SameSite=SameSiteMode.None
        };
        Response.Cookies.Append("basketId",basketId,cookieOptions);
        var basket = new Basket{BasketId=basketId};
        context.Baskets.Add(basket);
        return basket;
    }
}
