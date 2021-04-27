const fs = require("fs").promises;
const AnchorsParser = require("anchorspdf");

const left_delimiter = "{{";
const right_delimiter = "}}";
const password = null

file_object = {
  anchor: "signature1",
  width: 150,
  height: 34,
};

async function ennrich(file_object) {

  const data = await fs.readFile("pdf/demo.pdf");
  const parser = new AnchorsParser(left_delimiter, right_delimiter, password);
  const anchors = await parser.parse_file(data.buffer);

  anchor = file_object.anchor;
  file_objects = [];

  for (let i = 0; i < anchors[anchor].length; i++) {

    x0 = anchors[anchor][i].x0 
    y0_orig = anchors[anchor][i].y0_orig
    x1 = anchors[anchor][i].x0 + file_object.width
    y1_orig = anchors[anchor][i].y0_orig + file_object.height

    const file_object_enriched = {
      page: anchors[anchor][i].page,
      position: `${x0},${y0_orig},${x1},${y1_orig}`,
    };

    file_objects.push(file_object_enriched);
  }
  return file_objects;

}

ennrich(file_object).then(console.log);