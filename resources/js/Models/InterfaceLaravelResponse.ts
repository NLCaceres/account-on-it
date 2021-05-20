import { AxiosResponse } from 'axios';

//? Marker Interface, Generalized type safety feature indicating specific usage/purpose
//? BUT allows the implementation to vary as much as needed in classes that implement it
interface LaravelResponse { }

export abstract class LaravelDetailResponse<T> implements LaravelResponse {
  constructor(public data: T) {
    
  }
}

export class LaravelPaginatedResponse<T> implements LaravelResponse {
  constructor(public data: T[], public from: number, public to: number,
  public total: number, public path: string, public current_page: number,
  public last_page: number, public first_page_url: string, public last_page_url: string,
  public next_page_url: string, public prev_page_url: string, public per_page: number) {}
}

//! Convenience Typing
//* Useful for writing API Callbacks to Laravel Requests
export type TypicalPaginatedResponse<T> = LaravelPaginatedResponse<T> | AxiosResponse;

export type TypicalDetailResponse<T> = LaravelDetailResponse<T> | AxiosResponse;

//! Function Typing
export interface SetDataFunc {
  (data?: LaravelResponse, err?: Error): void
}
