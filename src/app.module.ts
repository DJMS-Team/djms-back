import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ResourcesModule } from './resources/resources.module';
import { InventoriesModule } from './inventories/inventories.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './auth/guard/auth.guard';
import { AddressModule } from './address/address.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities:true,
      synchronize:true,
      ssl: {
        rejectUnauthorized :false
      },
      logger: 'advanced-console',
      logging: 'all'
    }),
    AuthModule,
    ResourcesModule,
    InventoriesModule,
    OrdersModule,
    UsersModule,
    AddressModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule {}
