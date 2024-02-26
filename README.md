# aws-cdk-course

[Course - aws-typescript-cdk-serverless-react](https://www.udemy.com/course/aws-typescript-cdk-serverless-react/)

## Pre-requirements
- Nodejs - Install Nodejs version 21  by follwoing;
```
sudo apt update &&\
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash - &&\
sudo apt-get install -y nodejs

# Install npm
sudo apt install npm

# check Nodejs version
node --version
```

- Typescript - Install Typescript
```
sudo npm install -g typescript

# Check typescript version
tsc -v
```

## Create an IAM User
Go to IAM -> Add user -> Enter username -> Next ->  Add permissions -> Check `AdministratorAccess` -> Create

## Install aws-cli
Run the following steps;
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```
- Check aws version;
```
aws --version
```

## [Setup aws-cli with the IAM user](https://docs.aws.amazon.com/cli/latest/userguide/cli-authentication-user.html)
- Go to the user created -> Security credentials -> Access Keys -> Create Access key -> Download .csv -> Done.
- Run `aws configure` and enter the `AWS Access Key ID (from .csv file we downloaded)`, `AWS Secret Access Key (from .csv file we downloaded)`, `region name` and `output format (json)`. 

- Now, the aws-cli is configured and we can access the aws services. To verify, run; `aws s3 ls`. If it lists the buckets you created in your account, it is configured successfully. 

This will configured the credentials to use aws-cli but it is not a recommended way as the keys are stored on machine for long-term.
*Todo* - Move the access from long-term to short-term credentials that refresh the credentials automatically. 

## CloudFormation Intro
aws-cdk is created on top of CloudFormation. A *struct* is a group of aws resources. 
- Install aws-cdk (requires npm. Please refer to [Pre-requirements](#pre-requirements) to install it);
```
sudo npm install -g aws-cdk

# To uninstall it
npm uninstall -g aws-cdk
```

Create a cdk project through terminal, run to initialize it;
```
cdk init
```
