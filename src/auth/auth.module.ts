import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt-strategy';
@Module({
  imports: [PassportModule.register({
    defaultStrategy: 'jwt'
  }), JwtModule.register({
    secret: 'thuongdeptrai',
    signOptions: {
      expiresIn: 3600
    }
  }), TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy],
  exports: [ // make request at for any module need jwt
    JwtStrategy,
    PassportModule

  ]
})
export class AuthModule { }
