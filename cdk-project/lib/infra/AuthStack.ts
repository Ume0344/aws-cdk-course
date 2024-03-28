import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { UserPool, UserPoolClient, CfnUserPoolUser } from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';


export class AuthStack extends Stack {
    public userPool: UserPool;
    private userPoolClient: UserPoolClient;
    private userPoolUser: CfnUserPoolUser

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        this.createUserPool()
        this.createUserPoolClient()
        this.createUserPoolUser()
    }

    // user is allowed to signup or signin with username and email.
    private createUserPool(){
        this.userPool = new UserPool(this, 'MessageUserPool', {
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });

        new CfnOutput(this, 'MessageUserPoolId', {
            value: this.userPool.userPoolId
        })
    }

    // client to interact with userpool.
    private createUserPoolClient(){
        this.userPoolClient = this.userPool.addClient('MessageUserPoolClient', {
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        });
        new CfnOutput(this, 'UserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })
    }

    private createUserPoolUser(){
        this.userPoolUser = new CfnUserPoolUser(this, 'MessageUserPoolUser', {
            userPoolId: this.userPool.userPoolId,
            username: "bubble",
        })
    }
}
