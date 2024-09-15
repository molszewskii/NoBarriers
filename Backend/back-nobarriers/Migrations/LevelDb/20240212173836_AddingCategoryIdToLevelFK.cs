using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.LevelDb
{
    /// <inheritdoc />
    public partial class AddingCategoryIdToLevelFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateIndex(
                name: "IX_Levels_CategoryId",
                table: "Levels",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Levels_Categories_CategoryId",
                table: "Levels",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Levels_Categories_CategoryId",
                table: "Levels");

            migrationBuilder.DropIndex(
                name: "IX_Levels_CategoryId",
                table: "Levels");
        }
    }
}
