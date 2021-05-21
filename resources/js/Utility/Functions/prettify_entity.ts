export function IdKeyCheck(propName: string, strictID: boolean = false): boolean {
  //* If strict ID flag set then, only 'id' or '_id' will match, no foreign keys, e.g. 'user_id' or 'foreign_id'
  return (!strictID)? /_?id$/i.test(propName) : /^_?id$/i.test(propName); 
}

export function PrettifyColumnNames(column: string | [string, any]): string | [string, any] { //? The power of Typescript tuples!  
  const columnName = typeof column === 'string' ? column : column[0];
    
  const lowerColumnName = columnName.toLowerCase();
  //* Check if id column to output ID
  let prettyColumnName = IdKeyCheck(lowerColumnName, true) ? "ID"
    : columnName.replace("_", " ").trim().replace(/\b\w/g, a => a.toUpperCase());
    //* If any other column, swap underscore with space, trim leading and ending whitespace, and uppercase letters at word boundaries
  
  if (IdKeyCheck(prettyColumnName)) prettyColumnName = prettyColumnName.replace("Id", "ID");

  return (typeof column === 'string') ? prettyColumnName : [prettyColumnName, column[1]];
}

export function FilterColumns(column: string | [string, any]): boolean {
  const columnName = (typeof column === 'string') ? column
    : column[0] //* First index used here to grab only the key! We receive [key, val] pairs from Object.entries()

  //* Checks if Created_at or Updated_at column so they can be filtered out
  const IsCreatedAndUpdated = columnName === "created_at" || columnName === "updated_at";
  //* Case insensitive global search for 'id' or '_id' (also registered or current for tenants)
  const FoundAdminOnlyColumn = /id|registered|current/gi.test(columnName);
  //* Filters out based on the above column name matches
  return !IsCreatedAndUpdated && !FoundAdminOnlyColumn;
}

export function CheckIfDate(utcDateStr: string): string {
  //? There's also parseInt and parseFloat but a simple '+' does the trick often times
  if (isNaN(+utcDateStr)) { //* Nums are accepted as Js Dates so if we find one then don't allow it

    var dateObj = new Date(utcDateStr);
    
    return isNaN(dateObj.getTime()) //* Regular strings return NaN when Date methods are called
      ? utcDateStr //* Return the original string. It's not a Date
      : `${dateObj.toLocaleTimeString()}, ${dateObj.toLocaleDateString()}`;
  } 

  return utcDateStr;
}