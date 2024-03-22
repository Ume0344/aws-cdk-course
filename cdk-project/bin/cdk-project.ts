#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/infra/LambdaStack';
import { ApiStack } from '../lib/infra/ApiStack';
import { DataStack } from '../lib/infra/DataStack';

const app = new cdk.App();

const dataStack = new DataStack(app, 'DataStack', {});

const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    helloTable: dataStack.helloTable,
});

const apiStack = new ApiStack(app, 'ApiStack', {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration
});
