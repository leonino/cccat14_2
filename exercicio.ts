const statement = "create table author (id number, name string, age number, city string, state string, country string)";
const regexp = /create table ([a-z]+) \((.+)\)/;
const parsedStatement = statement.match(regexp);

if (!parsedStatement) console.error("Error match statement")
else {
  const tableName = parsedStatement[1];
  const parsedcolumns = parsedStatement[2].split(",");
  let columns = {};
  for (const text of parsedcolumns) {
    const [key, value] = text.trim().split(" ");
    columns[key] = value;
  }
  const database = {
    tables: {
      [tableName]: {
        columns: columns,
        data: []
      }
    }
  };
  console.log(JSON.stringify(database, undefined, "  "));
}
