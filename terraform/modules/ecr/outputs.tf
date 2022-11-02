output "ui_repo_url" {
	value = aws_ecr_repository.ecr_ui.repository_url
}
output "api_repo_url" {
	value = aws_ecr_repository.ecr_api.repository_url
}
output "scheulder_repo_url" {
	value = aws_ecr_repository.ecr_scheduler.repository_url
}