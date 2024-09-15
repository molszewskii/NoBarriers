using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.TestDb
{
    /// <inheritdoc />
    public partial class AddingFlashCardBoxIdToTestFK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateIndex(
                name: "IX_Tests_FlashCardBoxId",
                table: "Tests",
                column: "FlashCardBoxId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tests_FlashCardBoxes_FlashCardBoxId",
                table: "Tests",
                column: "FlashCardBoxId",
                principalTable: "FlashCardBoxes",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tests_FlashCardBoxes_FlashCardBoxId",
                table: "Tests");

            migrationBuilder.DropIndex(
                name: "IX_Tests_FlashCardBoxId",
                table: "Tests");
        }
    }
}
