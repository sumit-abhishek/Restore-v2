using System;
using API.Data;
using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController(PaymentService paymentService, StoreContext context) : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets.GetBasketWithItems(Request.Cookies["basketId"]);
        if (basket == null) return BadRequest("Problem With The Basket");
        var intent = await paymentService.CreateOrUpdatePaymentIntent(basket);
        if (intent == null) return BadRequest("Problem Creating Payment Intent");
        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret = intent.ClientSecret;
        if (context.ChangeTracker.HasChanges())
        {
            var result = await context.SaveChangesAsync() > 0;
            if (!result) return BadRequest("Problem Updating Basket with Payment Intent");
        }

        return basket.ToDto();
    }
}
