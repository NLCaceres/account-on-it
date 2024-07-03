import { TypicalPaginatedResponse } from "../Models/InterfaceLaravelResponse";
//* The above are types that simplify writing PaginatedResponse | Axios Response
//* & LaravelResponse | AxiosResponse below and elsewhere

export type SimpleCallback<T> = {
  (data?: T, err?: Error): void;
};

export type PaginatedCallback<T> = {
  (data?: TypicalPaginatedResponse<T>, err?: Error): void;
};

interface IRepository<T, R> {
  //? Best to define properties in abstract class or it'll complain about access modifiers
  //* Create, Update by id, Get all, Get by id, Delete by ID
  Create(data: T): Promise<boolean>;

  GetAll(callback?: PaginatedCallback<T>): Promise<T[]>;

  GetByID(id: number, callback?: SimpleCallback<R>): Promise<T | void>;

  Update(id: number, data: T): Promise<boolean>;

  Delete(id: number, callback?: SimpleCallback<T>): Promise<boolean>;
}

export default IRepository;