import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game } from './game.model';
import { CreateGameInput } from '../dto/create-game.input';
import { UpdateGameInput } from '../dto/update-game.input';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game], { name: 'getAllGames' })
  async findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }
  @Query(() => [Game], { name: 'getGamesByPosteId' })
  async getGamesByPosteId(
    @Args('posteId', { type: () => String }) posteId: string,
  ): Promise<Game[]> {
    return this.gameService.findByPosteId(posteId);
  }

  async findOne(@Args('id', { type: () => String }) id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Mutation(() => Game, { name: 'createGame' })
  async create(
    @Args('CreateGameInput') CreateGameInput: CreateGameInput,
  ): Promise<Game> {
    return this.gameService.create(CreateGameInput);
  }

  @Mutation(() => Game, { name: 'updateGame' })
  async update(
    @Args('id', { type: () => ID }) id: string,
    @Args('UpdateGameInput') UpdateGameInput: UpdateGameInput,
  ): Promise<Game> {
    return this.gameService.update(id, UpdateGameInput);
  }

  @Mutation(() => Game, { name: 'deleteGame' })
  async remove(@Args('id', { type: () => ID }) id: string): Promise<Game> {
    return this.gameService.remove(id);
  }
}
