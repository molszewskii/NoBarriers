using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.LevelDb
{
    /// <inheritdoc />
    public partial class AddingDescriptionToLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Levels",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Levels");
        }
    }
}
