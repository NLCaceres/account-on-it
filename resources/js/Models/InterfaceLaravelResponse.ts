import { AxiosResponse } from "axios";

export type LaravelPaginatedResponse<T> = {
  data: T[],
  from: number, to: number, total: number, per_page: number,
  current_page: number, last_page: number,
  path: string, first_page_url: string, last_page_url: string,
  next_page_url: string, prev_page_url: string,
};

// !: Convenience Typing
// - Useful for writing API Callbacks to Laravel Requests
// TODO: Rename to AppPaginatedResponse
export type TypicalPaginatedResponse<T> = LaravelPaginatedResponse<T> | AxiosResponse;
