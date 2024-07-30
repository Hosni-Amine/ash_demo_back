import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poste, PosteDocument } from './poste.model';
import { CreatePosteInput } from '../dto/create-poste.input';
import { UpdatePosteInput } from '../dto/update-poste.input';

@Injectable()
export class PosteService {
  constructor(
      @InjectModel(Poste.name) private posteModel: Model<PosteDocument>,
  ) {}

  async create(CreatePosteInput: CreatePosteInput): Promise<Poste> {
    const createdPoste = new this.posteModel(CreatePosteInput);
    return createdPoste.save();
  }

  async findAll(): Promise<Poste[]> {
    return this.posteModel.find().populate('games').exec();
  }

  async findById(id: string): Promise<Poste | null> {
    return this.posteModel.findById(id).populate('games').exec();
  }

  async update(id: string, UpdatePosteInput: UpdatePosteInput): Promise<Poste> {
    const updatedPoste = await this.posteModel
        .findByIdAndUpdate(id, UpdatePosteInput, { new: true })
        .populate('games')
        .exec();
    if (!updatedPoste) {
      throw new NotFoundException(`Poste with ID ${id} not found`);
    }
    return updatedPoste;
  }

  async remove(id: string): Promise<Poste> {
    const deletedPoste = await this.posteModel.findByIdAndDelete(id).exec();
    if (!deletedPoste) {
      throw new NotFoundException(`Poste with ID ${id} not found`);
    }
    return deletedPoste;
  }
}
