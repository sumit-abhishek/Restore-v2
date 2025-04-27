using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "de43704b-1851-4433-a51a-58eefbd264b3", Name = "Memeber", NormalizedName = "MEMEBER" },
            new IdentityRole { Id = "8d619712-d977-4c53-9aed-c8d224bf2571", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
}
