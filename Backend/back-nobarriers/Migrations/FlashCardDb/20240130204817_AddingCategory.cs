using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.FlashCardDb
{
    /// <inheritdoc />
    public partial class AddingCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "FlashCardBoxes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_FlashCardBoxes_CategoryId",
                table: "FlashCardBoxes",
                column: "CategoryId");

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

            migrationBuilder.DropIndex(
                name: "IX_FlashCardBoxes_CategoryId",
                table: "FlashCardBoxes");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "FlashCardBoxes");
        }
    }
}
