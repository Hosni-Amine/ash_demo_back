import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { PosteResolver } from './poste/poste.resolver';
import { PosteModule } from './poste/poste.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://mohamedaminehosni:e4nC1VbUVi7m4yTo@ashdemo.nntngkp.mongodb.net/',
    ),
    PosteModule,
    GameModule,
  ],
  providers: [AppService, PosteResolver],
})
export class AppModule {}
