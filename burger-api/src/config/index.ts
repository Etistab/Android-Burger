import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration object.
 */
export const CONFIG = {
  port: process.env.NODE_PORT,
  auth: {
    adminGroupId: process.env.AZURE_ADMIN_GROUP_ID,
    tenantId: process.env.AZURE_TENANT,
    clientId: process.env.AZURE_CLIENT_ID,
    get identityMetadata(): string {
      return `https://login.microsoftonline.com/${this.tenantId}/v2.0/.well-known/openid-configuration`;
    },
    audience: process.env.AZURE_AUDIENCE,
    get issuer(): string {
      return `https://sts.windows.net/${this.tenantId}/`;
    }
  },
  database: {
    port: process.env.MONGO_PORT,
    host: process.env.MONGO_HOST,
    dbName: process.env.MONGO_DBNAME,
    get url(): string {
      return `mongodb://${this.host}:${this.port}`;
    }
  }
};
