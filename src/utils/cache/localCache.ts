//create local cache with id as key
class LocalCache<T> {
  private cache: Map<string, T>;
  private readonly maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map<string, T>();
    this.maxSize = maxSize;
  }

  set(id: string, value: T): void {
    // If cache is full, remove oldest entry
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(id, value);
  }

  get(id: string): T | undefined {
    return this.cache.get(id);
  }

  has(id: string): boolean {
    return this.cache.has(id);
  }

  delete(id: string): boolean {
    return this.cache.delete(id);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export default LocalCache;