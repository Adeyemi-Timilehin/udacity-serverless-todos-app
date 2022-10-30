import * as AWS from 'aws-sdk';
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

//Accessing the S3buckets
const Bucket_Name = process.env.ATTACHMENT_S3_BUCKET
//Accessing the Expiration Time
const ExpirationTime = 300
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})


export function UploadUrl(imageId: string) {
   
    return s3.getSignedUrl('putObject', {
        Bucket: Bucket_Name,
        Key: imageId,
        Expires: ExpirationTime
    })
}