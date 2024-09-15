using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace back_nobarriers.Migrations
{
    /// <inheritdoc />
    public partial class addingLanguageCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "116b4620-08eb-4f24-95aa-7137c6ea082e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "76cced5e-0bf6-43e8-a8cf-51b220ab6469");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e106d146-3ca6-4316-8014-9913d288814c");

            migrationBuilder.AddColumn<string>(
                name: "LanguageCourse",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "44672a24-9ae5-4d06-93f7-68668400c78c", "2", "TEACHER", "TEACHER" },
                    { "96ece7b8-e7b4-4ea3-93c2-4454c2fd6355", "1", "USER", "USER" },
                    { "cbd9f121-84c3-47c4-ba33-1aa8375fbe37", "0", "ADMIN", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "44672a24-9ae5-4d06-93f7-68668400c78c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "96ece7b8-e7b4-4ea3-93c2-4454c2fd6355");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cbd9f121-84c3-47c4-ba33-1aa8375fbe37");

            migrationBuilder.DropColumn(
                name: "LanguageCourse",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "116b4620-08eb-4f24-95aa-7137c6ea082e", "2", "TEACHER", "TEACHER" },
                    { "76cced5e-0bf6-43e8-a8cf-51b220ab6469", "1", "USER", "USER" },
                    { "e106d146-3ca6-4316-8014-9913d288814c", "0", "ADMIN", "ADMIN" }
                });
        }
    }
}
