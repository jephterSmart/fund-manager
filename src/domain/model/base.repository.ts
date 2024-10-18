interface BaseRepository<T> {
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  save(model: T): Promise<void>;
  nextId(): string;
}

export default BaseRepository;
