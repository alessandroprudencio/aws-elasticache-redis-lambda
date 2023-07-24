# Configuring a Lambda Function with ElastiCache Redis Cluster in VPC

This guide provides a step-by-step process to configure a Lambda function that connects to an ElastiCache Redis cluster in a Virtual Private Cloud (VPC). Configuring the function within a VPC provides enhanced security and control over communication with the ElastiCache Redis cluster.

## Prerequisites

- AWS account with permissions to create VPC, Lambda, ElastiCache, and Nat Gateway resources.
- Basic knowledge of AWS resource creation using the AWS Management Console.

## Step 1: Create VPC and Subnets

1. Access the AWS Management Console and navigate to the VPC service.
2. Create a new VPC with two private subnets and two public subnets using the "VPC Wizard". The automatic configuration will create subnets in different availability zones (AZs).

## Step 2: Create a Security Group

1. Still in the AWS Management Console, access the VPC service.
2. Create a new Security Group to allow necessary traffic between the Lambda function and the ElastiCache Redis cluster. For example, allow ports 443 and 6379 for communication.

## Step 3: Create a Lambda Function

1. Access the AWS Management Console and navigate to the Lambda service.
2. Create a new Lambda function according to your specific code and requirements.
3. On the creation or edit page of the Lambda function, find the "Network" section.
4. Select the previously created VPC and choose the private subnets and Security Group.

## Step 4: Create the ElastiCache Redis Cluster

1. Access the AWS Management Console and navigate to the ElastiCache service.
2. Create a new ElastiCache Redis cluster, selecting the previously created VPC and associating the Security Group. Ensure that only the private subnets are selected in the Subnet Group.

## Step 5: Configure the Nat Gateway

1. Create a Nat Gateway to allow the private subnets to communicate with the internet. Allocate an elastic IP and select a public subnet for the Nat Gateway.
2. Make sure to configure the Route Table of the private subnets to allow traffic through the Nat Gateway.

## Step 6: Configure the Endpoint of the ElastiCache Redis Cluster

1. Add the necessary code to your Lambda function to connect to the ElastiCache Redis cluster using the cluster's endpoint.

With these steps, you will have successfully configured a Lambda function that connects to an ElastiCache Redis cluster in a VPC, ensuring enhanced security and control over communication with your Redis cluster.

## Benchmark Databases

### ElastiCache Redis (us-east-1, cache.t4g.micro)

First test:

- Read: 19ms
- Write: 374ms

Average:

- Read: 1ms
- Write: 1ms

### Amazon MemoryDB for Redis (us-east-1, db.t4g.small )

First test:

- Read: 15ms
- Write: 471ms

Average:

- Read: 1ms
- Write: 4ms
