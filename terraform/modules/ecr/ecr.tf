resource "aws_ecr_repository" "ecr_ui" {
	name = "baggers-${terraform.workspace}-ui"
}
resource "aws_ecr_repository" "ecr_api" {
	name = "baggers-${terraform.workspace}-api"
}
resource "aws_ecr_repository" "ecr_scheduler" {
	name = "baggers-${terraform.workspace}-scheduler"
}