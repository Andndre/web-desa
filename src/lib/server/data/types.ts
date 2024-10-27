export type ReturnTypeAsync<T extends (...args: any[]) => Promise<any[]>> =
  Awaited<ReturnType<T>>;

export type ReturnTypeItemAsync<T extends (...args: any[]) => Promise<any[]>> =
  Awaited<ReturnType<T>>[number];
