# Cloud Project 2 – Serverless Counter App with Security & Logging

This project demonstrates how to build a serverless, secure, and monitored web application using AWS services.  
It consists of a static frontend hosted on **CloudFront** that interacts with an API Gateway + Lambda backend.  
The application counts page visits and includes **security (AWS WAF)** and **monitoring (CloudTrail)**.

Live Demo: [CloudFront Deployed App](https://d1nnswwl0n5ldc.cloudfront.net)
  ![Frontend Counter Page](images/frontend.png)
---

##  Project Overview
- **Frontend:** Static HTML/JS webpage hosted on **S3 + CloudFront**  
- **Backend:** **API Gateway** that triggers an **AWS Lambda** function  
- **Database:** **DynamoDB** used to store and increment page visit counts  
- **Security:** **AWS WAF Web ACL** with rate limiting to protect API Gateway from abuse  
- **Monitoring:** **CloudTrail** enabled to log and track API Gateway calls  
- **Deployment:** CloudFront used for global CDN distribution of the frontend  

---

##  Architecture
Here’s the logical architecture you should recreate in a diagram tool (e.g., draw.io, Lucidchart, Excalidraw):

1. **User Browser** → accesses static frontend via **CloudFront Distribution**  
2. **CloudFront** → serves files from **S3 Bucket (Static Website Hosting)**  
3. **Frontend** → makes `fetch` requests to **API Gateway Endpoint**  
4. **API Gateway** → forwards request to **Lambda Function**  
5. **Lambda Function** → updates/increments **DynamoDB Table** and returns the count  
6. **WAF Web ACL** → attached to API Gateway to enforce rate limiting and block suspicious traffic  
7. **CloudTrail** → logs all API calls for auditing and monitoring  

![Architecture](images/architecture.png)

---

## 🔐 Security & Logging
- **AWS WAF**: Configured with a Web ACL and rate-based rule to protect against brute force or DDoS-style attacks.  
- **CloudTrail**: Set up to capture API Gateway activity, including which IPs are making requests. This helps with auditing and debugging.  

---

## 🚀 Steps Performed
1. Created **S3 bucket** for hosting frontend files.  
   ![S3 Bucket](images/s3_bucket.png)
   ![S3 Bucket](images/s3_bucket2.png)

3. Configured **CloudFront** distribution to serve files globally.  
   ![CloudFront Distribution](images/cloudfront.png)

4. Developed **Lambda function** to update DynamoDB counter.  
   ![Lambda Function](images/lambda.png)

5. Set up **DynamoDB table** with partition key for storing visit counts.  
   ![DynamoDB Table](images/dynamodb.png)

6. Exposed Lambda via **API Gateway** with `POST`/`GET` method integration.  
   ![API Gateway](images/apigateway.png)

7. Updated frontend JavaScript to call the API Gateway endpoint.  
   ![Frontend Counter Page](images/frontend.png)

8. Added **AWS WAF** Web ACL with rate limiting rule.  
   ![WAF Rule](images/waf.png)

9. Enabled **CloudTrail** to monitor API calls.  
   ![CloudTrail Logs](images/cloudtrail.png)

---


## 🌐 Live Demo
Access the deployed app here:  
👉 [https://d1nnswwl0n5ldc.cloudfront.net](https://d1nnswwl0n5ldc.cloudfront.net)

---
