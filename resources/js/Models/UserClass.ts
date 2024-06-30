import Person from "./Person";

export const Role = {
  Default: -1, Normal: 0, Admin: 1, Super: 2
} as const;
type RoleKey = keyof typeof Role;

// ?: Typescript enums would get reverse mapping BUT `as const` style enums don't
// - SO `AccountType[-1]` doesn't return "Default" BUT `AccountType["Default"]`, of course, returns -1
export const AccountType = {
  Default: -1, Landlord: 0, Tenant: 1
} as const; // ?: Adding `as const` prevents altering the key:value pairs (which the first const alone doesn't prevent)
type AccountTypeKey = keyof typeof AccountType;


type User = {
  role: RoleKey,
  account_type: AccountTypeKey,
  email_verified_at?: Date,
  password?: string
} & Person;
export type RegisteringUser = {
  password_confirmation: string
} & User;

export type UserDetailResponse = {
  user: User
};

export default User;