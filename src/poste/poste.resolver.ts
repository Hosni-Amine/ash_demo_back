import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PosteService } from './poste.service';
import { Poste } from './poste.model';
import { CreatePosteInput } from '../dto/create-poste.input';
import { UpdatePosteInput } from '../dto/update-poste.input';
import { GameService } from 'src/game/game.service';

@Resolver(() => Poste)
export class PosteResolver {
  constructor(private readonly posteService: PosteService,
              private readonly gameService: GameService,
  ) {}

  @Query(() => [Poste], { name: 'getAllPostes' })
  async findAll(): Promise<Poste[]> {
    return this.posteService.findAll();
  }

  @Query(() => Poste)
  async getPosteById(@Args('id') id: string): Promise<Poste> {
    const poste = await this.posteService.findById(id);
    if (!poste) {
      throw new Error(`Poste with ID ${id} not found`);
    }
    // Populate related games
    poste.games = await this.gameService.findByPosteId(id);
    return poste;
  }

  @Mutation(() => Poste, { name: 'createPoste' })
  async create(
      @Args('CreatePosteInput') CreatePosteInput: CreatePosteInput,
  ): Promise<Poste> {
    return this.posteService.create(CreatePosteInput);
  }

  @Mutation(() => Poste, { name: 'updatePoste' })
  async update(
      @Args('id', { type: () => ID }) id: string,
      @Args('UpdatePosteInput') UpdatePosteInput: UpdatePosteInput,
  ): Promise<Poste> {
    return this.posteService.update(id, UpdatePosteInput);
  }

  @Mutation(() => Poste, { name: 'deletePoste' })
  async remove(@Args('id', { type: () => ID }) id: string): Promise<Poste> {
    return this.posteService.remove(id);
  }
}
