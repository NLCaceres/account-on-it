
export default interface LaravelError {
  // current_page: number,
  // data: Array<DbRecord> | DbRecord,

}

// interface RandomTypeFields {
//   field1: string | string[], field2: string | string[]
// }

// class RandomType implements RandomTypeFields {
//   constructor(public field1: string, public field2: string) {
    
//   }
// }

// class RandomTypeValidationErrs implements RandomTypeFields {
//   constructor() {

//   }
// }

// interface LaravelValidationError {
  //* Marker inteface
  //* All implementations are just
  //* field1: string[], field2: string[], etc.
// }

// class RandomTypeValidationErrs implements RandomType, LaravelValidationError {
//   constructor(public field1: string[], public field2: string[]) {

//   }
// }

export abstract class LaravelValidationErrorReponse<T> implements LaravelError {
  constructor(public data: T) {
    
  }
}

//? Future Reference
//* Laravel error responses are accessed as err.response
//? Revealing an object that mostly resembles AxiosError
//? BUT a few things are different on the top-level including data, headers, status, statusText

// export class Laravel<T> implements Error {
//   constructor(public data: T[], public from: number, public to: number,
//   public total: number, public path: string, public current_page: number,
//   public last_page: number, public first_page_url: string, public last_page_url: string,
//   public next_page_url: string, public prev_page_url: string, public per_page: number) {}
// }

// export interface StandardError {
//   message: string,
//   name: string,
//   stack: string, //* Combines Name and message plus maybe a code into str
//   config: AxiosRequestConfig
// }