import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { Logger } from '@nestjs/common';

export class SSMHandler {
  private client: SecretsManagerClient;
  private static instance: SSMHandler;

  private constructor() {
    this.client = new SecretsManagerClient({ region: process.env.REGION });
  }

  public static getInstance(): SSMHandler {
    if (!SSMHandler.instance) {
      SSMHandler.instance = new SSMHandler();
    }

    return SSMHandler.instance;
  }

  async getSecrets() {
    const secretsId = `secrets/${process.env['NODE' + '_ENV']}`;
    Logger.log(secretsId);
    const command = new GetSecretValueCommand({ SecretId: secretsId });
    return this.client
      .send(command)
      .then((res) => JSON.parse(res.SecretString))
      .catch((error) => JSON.stringify(error));
  }
}
