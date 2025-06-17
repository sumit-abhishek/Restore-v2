using System;

namespace API.DTOs;

public class BasketDto
{
    public int Id { get; set; }
    public required string BasketId { get; set; }
    public List<BasketItemDto> Items { get; set; } = [];
    public string? ClientSecret { get; set; }
    public string? PaymentIntentId { get; set; }
}
