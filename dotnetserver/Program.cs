using Microsoft.Extensions.FileProviders;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Basic Method
// builder.Services.AddHttpClient();

// Named Client Method
// builder.Services.AddHttpClient("pokemonclient", client =>
// {
//     client.BaseAddress = new Uri("https://pokeapi.co/api/v2/pokemon/");
// });

// Explicit DI Client
// builder.Services.AddScoped(hc => new HttpClient { BaseAddress = new Uri("https://pokeapi.co/api/v2/pokemon/") });

// Typed Client
builder.Services.AddHttpClient<PokemonClient>(client =>
{
    client.BaseAddress = new Uri("https://pokeapi.co/api/v2/pokemon/");
});


var app = builder.Build();

var items = new List<Item>
{
    new Item("Laptop", 500 ),
    new Item("Desktop", 750)
};

// http://localhost:8080/index.html
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/build"))
});

app.MapGet("/api/items", () => items);

// Basic Method
// app.MapGet("/api/pokemon/{id}", async (IHttpClientFactory httpClientFactory, int id) =>
// {
//     var request = new HttpRequestMessage(HttpMethod.Get, $"https://pokeapi.co/api/v2/pokemon/{id}");
//     var httpClient = httpClientFactory.CreateClient();
//     var response = await httpClient.SendAsync(request);
//     return await response.Content.ReadFromJsonAsync<Pokemon>();
// });

// Named Client Method
// app.MapGet("/api/pokemon/{id}", async (IHttpClientFactory httpClientFactory, string id) =>
// {
//     var httpClient = httpClientFactory.CreateClient("pokemonclient");

//     return await httpClient.GetFromJsonAsync<Pokemon>(id);
// });

// Explicit DI Client
// app.MapGet("/api/pokemon/{id}", async (HttpClient http, string id) =>
// {
//     return await http.GetFromJsonAsync<Pokemon>(id);
// });

// Typed Client
app.MapGet("/api/pokemon/{id}", async(PokemonClient pokemonClient, string id) => {
    return await pokemonClient.GetPokemonById(id);
});

app.Run("http://localhost:8080");

public class Item
{
    public string name { get; set; }
    public int price { get; set; }

    public Item(string name, int price)
    {
        this.name = name;
        this.price = price;
    }
}

public class Pokemon
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