import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'

export class TestingStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      // while creating this bucket, got error multiple times that 'bucket <name of bucket> already exists'. This error is due to the fact 
      // that when we delete the stack, the bucket with same name is present in aws s3 as it takes time for s3 bucket to be compeletely deleted.
      // If we change the logical id, cdk will first create a new resource (here a bucket with 'pseudobucket1' name). Cdk will detect that this 
      // bucket is already present and throws the error. To override the logical id (if we ever tempted to change it), we need to use 
      // 'overrideLogicalId' function. 
      const newBucket = new s3.Bucket(this, 'NewPseudoTestingBucket', { // logical id
        bucketName: 'pseudobucket1345656' // physical id
      });

      (newBucket.node.defaultChild as s3.CfnBucket).overrideLogicalId('NewTestingBucket23')
      
    }}
