import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private userRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.userRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
    .createQueryBuilder()
    .select('games')
    .from(Game, 'games')
    .where("games.title ILIKE :title", { title: `%${param}%` })
    .getMany();
      // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const games = await this.repository.count(); // Complete usando raw query
    return [{ count: String(games) }];
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.userRepository.createQueryBuilder('users')
    .innerJoin('users.games', 'games')
    .where('games.id = :id', { id })
    .getMany();
      // Complete usando query builder
  }
}
