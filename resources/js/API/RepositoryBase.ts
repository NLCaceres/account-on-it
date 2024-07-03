import axios from "axios";
import IRepository, { PaginatedCallback, SimpleCallback } from "./RepositoryInterface";

export default abstract class BaseRepository<T, R> implements IRepository<T, R> {
  constructor(private readonly BaseURL: string) {
    this.BaseURL = BaseURL;
  }

  async Create(data: T): Promise<boolean> {
    if (data) {
      try {
        const response = await axios.post(`${this.BaseURL}`, data);

        return response ? true : false;

      } catch (err) {
        return err.response || err.message;
      }
    }
    return false;
  }

  async GetAll(callback?: PaginatedCallback<T>, query: string = ""): Promise<T[]> {
    try {
      //* If callback === null, return response from server
      const response = await axios.get(`${this.BaseURL}${query}`);

      if (!callback) {
        const entities: T[] = response.data;
        return entities;
      }

      if (response !== null) callback(response.data);

    } catch (err) {
      //* If callback === null, return err msg to view to display
      if (!callback) return err.response || err.message;

      if (err.response) {
        //* Handle Laravel errs
        callback(undefined, err.response);
      } else {
        //* Handle standard errs
        callback(undefined, err.message);
      }
    }
    return [];
  }

  async GetByID(
    id: number,
    callback?: SimpleCallback<R>
  ): Promise<T | void> {
    try {
      //* If callback === null, return response from server
      const response = await axios.get(`${this.BaseURL}/${id}`);

      if (!callback) {
        console.log(response);
        const entity: T = response.data;
        return entity;
      }

      if (response) callback(response.data);

    } catch (err) {
      //* If callback === null, return err msg to view to display
      if (!callback) return err.response || err.message;

      if (err.response) {
        //* Handle Laravel errs
        callback(undefined, err.response);
      } else {
        //* Handle standard errs
        callback(undefined, err.message);
      }
    }
    return;
  }

  async Update(id: number, data: T): Promise<boolean> {
    try {
      return await axios.put(`${this.BaseURL}/${id}`, data);
    } catch (err) {
      return err.response || err.message;
    }
  }

  async Delete(
    id: number,
    callback?: SimpleCallback<T>
  ): Promise<boolean> {
    try {
      //* If callback === null, return response from server
      const response = await axios.delete(`${this.BaseURL}/${id}`);

      if (!callback) return response ? true : false;

      if (response !== null) callback(undefined, response.data);

    } catch (err) {
      //* If callback === null, return err msg to view to display
      if (!callback) return err.response || err.message;

      if (err.response) {
        //* Handle Laravel errs
        callback(undefined, err.response);
      } else {
        //* Handle standard errs
        callback(undefined, err.message);
      }
    }
    return false;
  }
}
