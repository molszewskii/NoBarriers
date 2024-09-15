using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace back_nobarriers.Migrations
{
    /// <inheritdoc />
    public partial class userDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "91038e0e-715c-46ac-b47b-ea1327e4ab49");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9194c8b5-322b-4df6-9412-7949b1b34bd4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d89167b9-80c5-40ed-b955-c0af46b322d7");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Role",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "91038e0e-715c-46ac-b47b-ea1327e4ab49", "2", "TEACHER", "TEACHER" },
                    { "9194c8b5-322b-4df6-9412-7949b1b34bd4", "0", "ADMIN", "ADMIN" },
                    { "d89167b9-80c5-40ed-b955-c0af46b322d7", "1", "USER", "USER" }
                });
        }
    }
}
