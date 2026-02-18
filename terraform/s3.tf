resource "aws_s3_bucket" "website" {
  bucket = "${var.project_name}-${random_id.bucket_suffix.hex}"
}

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_object" "html" {
  bucket       = aws_s3_bucket.website.id
  key          = "sudoku.html"
  source       = "${path.module}/../sudoku.html"
  content_type = "text/html"
  etag         = filemd5("${path.module}/../sudoku.html")
}

resource "aws_s3_object" "css" {
  bucket       = aws_s3_bucket.website.id
  key          = "style.css"
  source       = "${path.module}/../style.css"
  content_type = "text/css"
  etag         = filemd5("${path.module}/../style.css")
}

resource "aws_s3_object" "js" {
  bucket       = aws_s3_bucket.website.id
  key          = "script.js"
  source       = "${path.module}/../script.js"
  content_type = "application/javascript"
  etag         = filemd5("${path.module}/../script.js")
}
