const { DBFFile } = require("dbffile");

async function batchWrite(fieldDescriptors, records) {
  const dbf = await DBFFile.create("new-config.dbf", fieldDescriptors);
  console.log("DBF file created.");
  await dbf.appendRecords(records);
  console.log(`${records.length} records added.`);
}

async function batchReadThenUpdate() {
  const dbf = await DBFFile.open("jaspxref.dbf");
  const fields = dbf.fields;

  // Magic Happens
  const records = (await dbf.readRecords()).map((x) => {
    x["ISPLC"] = false;
    return x;
  });

  // Call Write Function
  await batchWrite(fields, records);
}

batchReadThenUpdate();
