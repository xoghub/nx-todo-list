import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';
import { TeamController } from './controller/team.controller';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { TeamService } from './services/team.service';
import { JwtStrategy } from './guards/jwt.strategy';

import { User } from './model/user.model';
import { Team } from './model/team.model';
import { Todo } from './model/todo.model';
import { Session } from './model/session.model';
import { UsersTeam } from './model/users_team.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Team, Todo, Session, UsersTeam],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Team, Todo, Session, UsersTeam]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<any>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [AppController, AuthController, UserController, TeamController],
  providers: [AppService, AuthService, UserService, TeamService, JwtStrategy],
})
export class AppModule {}
