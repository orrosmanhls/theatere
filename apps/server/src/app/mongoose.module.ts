import { MongooseModule } from '@nestjs/mongoose';
import { SSMHandler } from '../providers/aws/secret-manager.handler';

export const MongooseConnectionModule = MongooseModule.forRootAsync({
  useFactory: async () => {
    const secrets = await SSMHandler.getInstance().getSecrets();

    const connection = {
      dbName: process.env.DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    if (!secrets?.db_connection_string || !secrets?.db_username || !secrets?.db_password) {
      connection['uri'] = process.env.DB_URI || 'mongodb://localhost:27017';
      connection['user'] = process.env.DB_USERNAME;
      connection['pass'] = process.env.DB_PASSWORD;
    } else {
      connection['uri'] = secrets.db_connection_string;
      connection['user'] = secrets.db_username;
      connection['pass'] = secrets.db_password;
    }
    return connection;
  }
});
