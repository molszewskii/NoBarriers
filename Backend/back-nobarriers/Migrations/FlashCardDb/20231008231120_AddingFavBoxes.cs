using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.FlashCardDb
{
    /// <inheritdoc />
    public partial class AddingFavBoxes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LikedBoxes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BoxId = table.Column<int>(type: "int", nullable: false),
                    IsIconClicked = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LikedBoxes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LikedBoxes_FlashCardBoxes_BoxId",
                        column: x => x.BoxId,
                        principalTable: "FlashCardBoxes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LikedBoxes_BoxId",
                table: "LikedBoxes",
                column: "BoxId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LikedBoxes");
        }
    }
}
