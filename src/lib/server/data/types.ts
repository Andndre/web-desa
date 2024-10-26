export type ReturnTypeItemAsync<
  T extends (page: number, perPage: number, ...args: any[]) => Promise<any[]>
> = Awaited<ReturnType<T>>[number];
