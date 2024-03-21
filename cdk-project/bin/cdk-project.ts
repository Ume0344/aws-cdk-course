#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/infra/LambdaStack';
import { ApiStack } from '../lib/infra/ApiStack';

const app = new cdk.App();
const lambdaStack = new LambdaStack(app, 'LambdaStack', {});
const apiStack = new ApiStack(app, 'ApiStack', {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration
})
