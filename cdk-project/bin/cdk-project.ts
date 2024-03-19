#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { LambdaStack } from '../lib/infra/LambdaStack';

const app = new cdk.App();
new LambdaStack(app, 'LambdaStack', {});
