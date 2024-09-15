using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.FlashCardDb
{
    /// <inheritdoc />
    public partial class AddingLanguageFKToFlashCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateIndex(
                name: "IX_FlashCardBoxes_LanguageId",
                table: "FlashCardBoxes",
                column: "LanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_FlashCardBoxes_Languages_LanguageId",
                table: "FlashCardBoxes",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlashCardBoxes_Language_LanguageId",
                table: "FlashCardBoxes");

            migrationBuilder.DropIndex(
                name: "IX_FlashCardBoxes_LanguageId",
                table: "FlashCardBoxes");
        }
    }
}
