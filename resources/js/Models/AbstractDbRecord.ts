export default abstract class DbRecord implements LaravelRecord {
    constructor(
        public id?: number,
        public created_at?: Date,
        public updated_at?: Date
    ) {}
}

export interface LaravelRecord {
    [key: string]: any;
}
