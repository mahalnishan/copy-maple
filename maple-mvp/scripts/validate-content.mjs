import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content/schemas/step.schema.json"), "utf-8"));
const validate = ajv.compile(schema);

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

const files = [
  path.join(process.cwd(), "content/ca/national.json"),
  path.join(process.cwd(), "content/ca/provinces/on.json"),
  path.join(process.cwd(), "content/ca/provinces/bc.json"),
  path.join(process.cwd(), "content/ca/provinces/qc.json"),
  path.join(process.cwd(), "content/ca/resident.json"),
];

let ok = true;
for (const f of files) {
  const arr = readJson(f);
  arr.forEach((step, idx) => {
    const valid = validate(step);
    if (!valid) {
      ok = false;
      console.error(`Invalid step in ${f} at index ${idx}:`, validate.errors);
    }
  });
}

if (!ok) {
  console.error("Content validation failed");
  process.exit(1);
} else {
  console.log("Content validation passed");
}
