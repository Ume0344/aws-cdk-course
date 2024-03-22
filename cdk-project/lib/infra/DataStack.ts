import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { getSuffixFromStack} from './Utils';
import { Table, AttributeType, ITable } from 'aws-cdk-lib/aws-dynamodb'


export class DataStack extends Stack {
  public readonly helloTable: ITable;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const stackSuffix = getSuffixFromStack(this);

    this.helloTable = new Table(this, 'HelloTable', {
        tableName: `HelloTable-${stackSuffix}`,
        partitionKey: {
            name: 'id',
            type: AttributeType.STRING 
        },
    });
  }
}
