import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3'

export class CdkProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // duration is a cnf parameter to define at deployment time
    const duration = new cdk.CfnParameter(this, 'duration', {
      default: 3,
      maxValue: 5,
      minValue: 1,
      type: 'Number',
    });

    const myBucket = new s3.Bucket(this, 'CDKProjectBucket', {
      lifecycleRules: [{
        expiration: cdk.Duration.days(duration.valueAsNumber)
      }]
    });

    // CfnOutput : To output/extract data of a resource (i.e, name of myBucket)
    new cdk.CfnOutput(this, 'cfnBucket', {
      value: myBucket.bucketName
    });

  }
}
