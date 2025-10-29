export interface Repository<T extends { id: number }> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(item: T): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

export function createInMemoryRepository<
  T extends { id: number }
>(): Repository<T> {
  let items: T[] = [];

  return {
    async getAll() {
      return [...items];
    },
    async getById(id: number) {
      return items.find((i) => i.id === id) || null;
    },
    async create(item: T) {
      items.push(item);
      return item;
    },
    async update(id: number, data: Partial<T>) {
      const index = items.findIndex((i) => i.id === id);
      if (index === -1) return null;
      items[index] = { ...items[index], ...data };
      return items[index];
    },
    async delete(id: number) {
      const before = items.length;
      items = items.filter((i) => i.id !== id);
      return items.length < before;
    },
  };
}
