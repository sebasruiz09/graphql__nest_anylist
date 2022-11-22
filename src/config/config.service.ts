import { InternalServerErrorException } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';

// eslint-disable-next-line
require('dotenv').config();

class ConfigService {
  constructor(private env: { [key: string]: string | undefined }) {}

  private getValue(key: string, throwErrow = true) {
    const value = this.env[key];
    if (!value && throwErrow)
      throw new InternalServerErrorException(
        `config error - missing key ${key}`,
      );
    return value;
  }

  ensureValues(keys: string[]) {
    keys.forEach((key) => this.getValue(key, true));
    return this;
  }

  getPort() {
    return this.getValue('DB_PORT', true);
  }

  isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  getTypeOrmConfig(): TypeOrmModuleOptions[] {
    return [
      {
        type: 'postgres',
        host: this.getValue('HOST'),
        port: parseInt(this.getValue('PORT')),
        username: this.getValue('DB_USERNAME'),
        password: this.getValue('DB_PASSWORD'),
        database: this.getValue('DB_NAME'),
        entities: [Item],
        synchronize: true,
        autoLoadEntities: true,
      },
    ];
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'HOST',
  'PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
]);

export { configService };
