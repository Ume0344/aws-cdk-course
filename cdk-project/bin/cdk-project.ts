#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { CdkProjectStack } from '../lib/misc./cdk-project-stack';

const app = new cdk.App();
new CdkProjectStack(app, 'CdkProjectStack', {});
