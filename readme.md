# S3 Bucket Test

This repository shows the content of three differents s3 buckets and filter them according to its extension (mp3, jpg, mp4).

# Requirements
- Docker engine (tested on 19.03.8 but it should run on older versions too).
- Docker compose (tested with 1.25.5)
-
# How to run it

  - Copy .envsample as .env and edit their variables according to your iam user with read access to s3 buckets.
  ```sh
  cp .envsample .env
  ```
  - Launch it with docker-compose up
  ```sh
  docker-compose up -d
  ```

# ToDo list:
  - Create all the infrastructure with Terraform.
  - Cloudwatch alerts.
  - Provisioning to install docker and docker-compose with terraform.
  - Improve dockerfile.
