import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Game, GameDocument } from './game.model';
import { CreateGameInput } from '../dto/create-game.input';
import { UpdateGameInput } from '../dto/update-game.input';
import { Poste, PosteDocument } from '../poste/poste.model';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    @InjectModel(Poste.name) private readonly posteModel: Model<PosteDocument>,
  ) {}

  async create(createGameDto: CreateGameInput): Promise<Game> {
    const { posteId, ...gameData } = createGameDto;

    let poste;
    if (posteId) {
      poste = await this.posteModel.findById(posteId);
      if (!poste) {
        throw new NotFoundException(`Poste with ID ${posteId} not found`);
      }
    }

    const createdGame = new this.gameModel({ ...gameData, poste });
    await createdGame.save();
    return this.gameModel.findById(createdGame._id).populate('poste').exec(); // Populate poste here
  }

  async findByPosteId(posteId: string): Promise<Game[]> {
    return this.gameModel.find({ poste: new Types.ObjectId(posteId) }).exec();
  }

  async findAll(): Promise<Game[]> {
    return this.gameModel.find().populate('poste').exec();
  }

  async findOne(id: string): Promise<Game> {
    const game = await this.gameModel.findById(id).populate('poste').exec();
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async update(id: string, UpdateGameInput: UpdateGameInput): Promise<Game> {
    const updatedGame = await this.gameModel
      .findByIdAndUpdate(id, UpdateGameInput, { new: true })
      .populate('poste')
      .exec();
    if (!updatedGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return updatedGame;
  }

  async remove(id: string): Promise<Game> {
    const deletedGame = await this.gameModel.findByIdAndDelete(id).exec();
    if (!deletedGame) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return deletedGame;
  }
}
