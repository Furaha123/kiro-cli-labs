resource "random_password" "db" {
  length  = 16
  special = true
}

resource "aws_security_group" "aurora" {
  name        = "${var.project}-${var.environment}-aurora-sg"
  description = "Aurora security group"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project}-${var.environment}-aurora-sg"
    Project     = var.project
    Environment = var.environment
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-${var.environment}-db-subnet"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name        = "${var.project}-${var.environment}-db-subnet"
    Project     = var.project
    Environment = var.environment
  }
}

resource "aws_rds_cluster" "main" {
  cluster_identifier      = "${var.project}-${var.environment}-aurora"
  engine                  = "aurora-mysql"
  engine_version          = var.db_engine_version
  database_name           = var.db_name
  master_username         = var.db_username
  master_password         = random_password.db.result
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.aurora.id]
  skip_final_snapshot     = true
  backup_retention_period = 7

  tags = {
    Name        = "${var.project}-${var.environment}-aurora"
    Project     = var.project
    Environment = var.environment
  }
}

resource "aws_rds_cluster_instance" "main" {
  count              = 2
  identifier         = "${var.project}-${var.environment}-aurora-${count.index + 1}"
  cluster_identifier = aws_rds_cluster.main.id
  instance_class     = var.db_instance_class
  engine             = aws_rds_cluster.main.engine
  engine_version     = aws_rds_cluster.main.engine_version

  tags = {
    Name        = "${var.project}-${var.environment}-aurora-${count.index + 1}"
    Project     = var.project
    Environment = var.environment
  }
}
