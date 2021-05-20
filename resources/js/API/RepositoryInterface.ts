import { TypicalPaginatedResponse, TypicalDetailResponse } from '../Models/InterfaceLaravelResponse';
//* The above are types that simplify writing PaginatedResponse | Axios Response 
//* & LaravelResponse | AxiosResponse below and elsewhere

export interface SimpleCallback<T> {
  (data?: TypicalDetailResponse<T>, err?: Error): void;
}

export interface PaginatedCallback<T> {
  (data?: TypicalPaginatedResponse<T>, err?: Error): void;
}

interface IRepository<T> {
  //? Best to define properties in abstract class or it'll complain about access modifiers
  //* Create, Update by id, Get all, Get by id, Delete by ID
  Create(data: T): Promise<boolean>;

  GetAll(callback?: PaginatedCallback<T>): Promise<T[]>;

  GetByID(
      id: number,
      callback?: SimpleCallback<T>
  ): Promise<T | void>;

  Update(id: number, data: T): Promise<boolean>;

  Delete(
      id: number,
      callback?: SimpleCallback<T>
  ): Promise<boolean>;
}

export default IRepository;