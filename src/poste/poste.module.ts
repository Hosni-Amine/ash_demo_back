import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PosteService } from './poste.service';
import { Poste, PosteSchema } from './poste.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Poste.name, schema: PosteSchema }]),
  ],
  providers: [PosteService],
  exports: [PosteService],
})
export class PosteModule {}
