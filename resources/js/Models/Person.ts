import DbRecord from "./DbRecord";

type Person = {
    first_name: string,
    surname: string,
    email: string
} & DbRecord

export default Person;
