#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/infra/LambdaStack';
import { ApiStack } from '../lib/infra/ApiStack';
import { DataStack } from '../lib/infra/DataStack';
import { AuthStack } from '../lib/infra/AuthStack';

const app = new cdk.App();

const dataStack = new DataStack(app, 'DataStack', {});

const lambdaStack = new LambdaStack(app, 'LambdaStack', {
    helloTable: dataStack.helloTable,
});

const authStack = new AuthStack(app, 'AuthStack', {})

const apiStack = new ApiStack(app, 'ApiStack', {
    helloLambdaIntegration: lambdaStack.helloLambdaIntegration
});
