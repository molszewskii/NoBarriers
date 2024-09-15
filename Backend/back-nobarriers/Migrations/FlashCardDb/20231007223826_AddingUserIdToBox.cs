using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.FlashCardDb
{
    /// <inheritdoc />
    public partial class AddingUserIdToBox : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlashCards_FlashCardBoxes_FlashCardBoxId",
                table: "FlashCards");

            migrationBuilder.AlterColumn<int>(
                name: "FlashCardBoxId",
                table: "FlashCards",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "FlashCardBoxes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_FlashCards_FlashCardBoxes_FlashCardBoxId",
                table: "FlashCards",
                column: "FlashCardBoxId",
                principalTable: "FlashCardBoxes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FlashCards_FlashCardBoxes_FlashCardBoxId",
                table: "FlashCards");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "FlashCardBoxes");

            migrationBuilder.AlterColumn<int>(
                name: "FlashCardBoxId",
                table: "FlashCards",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_FlashCards_FlashCardBoxes_FlashCardBoxId",
                table: "FlashCards",
                column: "FlashCardBoxId",
                principalTable: "FlashCardBoxes",
                principalColumn: "Id");
        }
    }
}
