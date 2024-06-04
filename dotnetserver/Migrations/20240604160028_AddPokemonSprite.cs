using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnetserver.Migrations
{
    /// <inheritdoc />
    public partial class AddPokemonSprite : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Sprite",
                table: "Pokemon",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Pokemon",
                keyColumn: "Id",
                keyValue: 1,
                column: "Sprite",
                value: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png");

            migrationBuilder.UpdateData(
                table: "Pokemon",
                keyColumn: "Id",
                keyValue: 2,
                column: "Sprite",
                value: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sprite",
                table: "Pokemon");
        }
    }
}
