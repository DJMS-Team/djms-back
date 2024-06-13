import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guard/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../users/entities/customer.entity';
import { Admin } from '../users/entities/admin.entity';

@Global()
@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Customer]),
        TypeOrmModule.forFeature([Admin])
      ],
      
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports:[AuthModule, AuthGuard, JwtModule]
})
export class AuthModule {}
