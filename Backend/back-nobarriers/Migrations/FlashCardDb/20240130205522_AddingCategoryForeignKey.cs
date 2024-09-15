using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.FlashCardDb
{
    /// <inheritdoc />
    public partial class AddingCategoryForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
               name: "FK_FlashCardBoxes_Categories_CategoryId",
               table: "FlashCardBoxes",
               column: "CategoryId",
               principalTable: "Categories",
               principalColumn: "Id",
               onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
               name: "FK_FlashCardBoxes_Categories_CategoryId",
               table: "FlashCardBoxes");
        }
    }
}
