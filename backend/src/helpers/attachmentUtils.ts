import * as AWS from 'aws-sdk';
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);
//Accessing the S3buckets
const bucketName = process.env.ATTACHMENT_S3_BUCKET
//Accessing the Expiration Time
const ExpirationTime   =    process.env.SIGNED_URL_EXPIRATION
const s3 = new XAWS.S3({
    signatureVersion: 'v4'
})


export function getUploadUrl(imageId: string) {
    return s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: imageId,
        Expires: ExpirationTime
    })
}