import { CognitoIdentityProvider, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CognitoIdentityHandler {
  client: CognitoIdentityProvider;
  static instance: CognitoIdentityHandler;

  constructor() {
    this.client = new CognitoIdentityProvider({ region: process.env.REGION });
  }

  public static getInstance(): CognitoIdentityHandler {
    if (!CognitoIdentityHandler.instance) {
      CognitoIdentityHandler.instance = new CognitoIdentityHandler();
    }
    return CognitoIdentityHandler.instance;
  }

  async getUserByToken(token: string) {
    const command = new GetUserCommand({ AccessToken: token });
    return this.client.send(command);
  }
}
