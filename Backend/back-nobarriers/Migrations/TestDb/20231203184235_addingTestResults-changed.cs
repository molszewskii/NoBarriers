using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_nobarriers.Migrations.TestDb
{
    /// <inheritdoc />
    public partial class addingTestResultschanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAnswer_1",
                table: "UserAnswer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CorrectAnswer_1",
                table: "CorrectAnswer");
            migrationBuilder.DropColumn(
        name: "QuestionId",
        table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "CorrectAnswer");
            migrationBuilder.AddColumn<int>(
      name: "QuestionId",
      table: "UserAnswer",
      type: "int",
      nullable: false,
      defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "CorrectAnswer",
                type: "int",
                nullable: false,
                defaultValue: 0);


            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UserAnswer",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");


           

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CorrectAnswer",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAnswer",
                table: "UserAnswer",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CorrectAnswer",
                table: "CorrectAnswer",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAnswer",
                table: "UserAnswer");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CorrectAnswer",
                table: "CorrectAnswer");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserAnswer");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CorrectAnswer");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionId",
                table: "UserAnswer",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "QuestionId",
                table: "CorrectAnswer",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAnswer",
                table: "UserAnswer",
                column: "QuestionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CorrectAnswer",
                table: "CorrectAnswer",
                column: "QuestionId");
        }
    }
}
