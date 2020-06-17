export default abstract class DbRecord {
    constructor(
        public id?: number,
        public created_at?: Date,
        public updated_at?: Date
    ) {}
}
