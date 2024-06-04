using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient("pokemonclient", client =>
{
    client.BaseAddress = new Uri("https://pokeapi.co/api/v2/pokemon/");
});

builder.Services.AddDbContext<PokemonDbContext>(options =>
{
    options.UseSqlite("Data Source=pokemon.db");
});

var app = builder.Build();

// http://localhost:8080/index.html
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/build"))
});

app.MapGet("/api/pokemon/{id}", async (IHttpClientFactory httpClientFactory, string id) =>
{
    var httpClient = httpClientFactory.CreateClient("pokemonclient");

    return await httpClient.GetFromJsonAsync<PokemonResponse>(id);
});

app.MapGet("/api/pokemon/captured", async (PokemonDbContext context) =>
{
    return await context.Pokemon.ToListAsync();
});

app.MapGet("/api/pokemon/captured/{id}", async (PokemonDbContext context, int id) =>
{
    return await context.Pokemon.FindAsync(id);
});

app.MapPost("/api/pokemon/catch", async (PokemonDbContext context, HttpRequest request) =>
{
    var pokemon = await request.ReadFromJsonAsync<Pokemon>();
    await context.Pokemon.AddAsync(pokemon);
    await context.SaveChangesAsync();
    return Results.StatusCode(201);
});

var port = app.Environment.IsDevelopment() ? "http://localhost:8080" : null;
app.Run(port);

public class Pokemon
{
    public int Id { get; set; }
    public int PokedexId { get; set; }
    public string Name { get; set; }
    public string Sprite { get; set; }
}

public class PokemonResponse
{

    public int Id { get; set; }
    public string Name { get; set; }
}

public class PokemonClient
{
    private HttpClient _httpClient;
    public PokemonClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Pokemon> GetPokemonById(string id)
    {
        return await _httpClient.GetFromJsonAsync<Pokemon>(id);
    }
}

public class PokemonDbContext : DbContext
{
    public PokemonDbContext(DbContextOptions<PokemonDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // optionsBuilder.UseInMemoryDatabase("Pokemon");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pokemon>().HasData(new Pokemon { Id = 1, PokedexId = 1, Name = "bulbasaur", Sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" });
        modelBuilder.Entity<Pokemon>().HasData(new Pokemon { Id = 2, PokedexId = 4, Name = "charmander", Sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" });
    }

    public DbSet<Pokemon> Pokemon { get; set; }
}