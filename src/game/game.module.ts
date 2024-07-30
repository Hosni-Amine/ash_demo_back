import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { Game, GameSchema } from './game.model';
import { Poste, PosteSchema } from '../poste/poste.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([{ name: Poste.name, schema: PosteSchema }]),
  ],
  providers: [GameService, GameResolver],
  exports: [GameService],
})
export class GameModule {}
