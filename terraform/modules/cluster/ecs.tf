resource "aws_ecs_cluster" "baggers-ecs" {
	name = "baggers-${terraform.workspace}-cluster"
}

resource "aws_ecs_cluster_capacity_providers" "baggers-providers" {
	cluster_name = aws_ecs_cluster.baggers-ecs.name
	capacity_providers = [ "FARGATE" ]

	default_capacity_provider_strategy {
	  capacity_provider = "FARGATE"
	  base = 1
	  weight = 100
	}
}



resource "aws_security_group" "UiSecurityGroup" {
	
	ingress {
		from_port = 80
		to_port = 80
		protocol = "TCP"
		cidr_blocks = [ "0.0.0.0/0" ]
	}

	ingress {
		from_port = 443
		to_port = 443
		protocol = "TCP"
		cidr_blocks = [ "0.0.0.0/0" ]
	}

	egress {
		from_port = 80
		to_port = 80
		protocol = "TCP"
		cidr_blocks = [ "0.0.0.0/0" ]
	}

	egress {
		from_port = 443
		to_port = 443
		protocol = "TCP"
		cidr_blocks = [ "0.0.0.0/0" ]
	}
  
}
resource "aws_ecs_task_definition" "ui"{
	family = "ui"
	requires_compatibilities = ["FARGATE"]
	network_mode             = "awsvpc"
	cpu = var.is_prod ?  2048 : 1024
	memory = 2048
	execution_role_arn = "arn:aws:iam::539913629665:role/ecsTaskExecutionRole"
	container_definitions = jsonencode([
		{
			name = "ui"
			image = "${var.ui_repo_url}/ui:latest"
			# image = "nginxdemos/hello"
			essential = true
		}
	])
}
resource "aws_ecs_service" "ui" {
	name = "ui"
	cluster = aws_ecs_cluster.baggers-ecs.id
	task_definition = aws_ecs_task_definition.ui.arn
	desired_count = var.is_prod ? 1 : 1


	network_configuration {
		subnets = [ "subnet-905010ca", "subnet-6d302625", "subnet-56838430"]
		assign_public_ip = true
		security_groups = [aws_security_group.UiSecurityGroup.id]
	}
}