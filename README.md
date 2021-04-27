# anchorspdf - nodejs

A simple library designed to give the coordinates of text anchors within PDF files.

This can be used to target specific spots in the body of a dynamically generated PDF.

For parsing the PDF files the tool relies on [pdf.js-extract](https://github.com/ffalt/pdf.js-extract) a wrapper around [pdf.js](https://github.com/mozilla/pdf.js).

## Installation

- `npm install https://github.com/romainminaud/anchorspdf-nodejs`

## Usage

- Prepare a PDF with text anchors, for instance {{anchor1}}, {{anchor2}}, etc. [Example PDF](examples/pdf/demo.pdf)

> :warning: The text anchors should not be flattened in the PDF (the tool does not perform OCR but merely text parsing)

- Import anchorspdf and instantiate an AnchorsParser class with the following arguments:

  - left_delimiter (required, left delimiter of the anchor)
  - right_delimiter (required, right delimiter of the anchor)
  - password (optional, provide it if the PDF file is password protected)

- Open the PDF file and use the parse_file method of the AnchorsParser class

```js

const AnchorsParser = require("anchorspdf");

const left_delimiter = "{{";
const right_delimiter = "}}";
const password = "12345678";

const parser = new AnchorsParser(left_delimiter, right_delimiter, password);

fs.readFile("demo.pdf", function (err, data) {
  if (err) throw err;
  const parser = new AnchorsParser(left_delimiter, right_delimiter, password);
  parser.parse(data.buffer).then((data) => {
    console.log(data);
  });
});

```

- Output:

A dictionnary with the name of each anchor (excluding the delimiters) as a key (for instance "anchor1", "anchor2", ...), and an array as a value containing for each anchor occurence in the document its page, coordinate, height and width.

```json
{
  "anchor1": [
    {
      "page": 1,
      "x0": 72,
      "x1": 138,
      "y0": 84,
      "y0_orig": 707,
      "y1_orig": 721,
      "width": 66,
      "height": 14
    },
    {
      "page": 1,
      "x0": 72,
      "x1": 138,
      "y0": 171,
      "y0_orig": 620,
      "y1_orig": 634,
      "width": 66,
      "height": 14
    }
  ],
  "anchor2": [
    {
      "page": 1,
      "x0": 72,
      "x1": 131,
      "y0": 244,
      "y0_orig": 547,
      "y1_orig": 561,
      "width": 59,
      "height": 14
    }
  ]
}
```

| Key     | Description                                                                |
| ------- | -------------------------------------------------------------------------- |
| page    | page of the anchor occurence (starting at 1)                               |
| x0      | lower left x-coordinate of the anchor occurence                            |
| x1      | upper right x-coordinate of the anchor occurence                           |
| y0      | lower left y-coordinate of the anchor occurence, y-axis going from top     |
| y1      | upper right y-coordinate of the anchor occurence, y-axis going from top    |
| y0_orig | lower left y-coordinate of the anchor occurence, y-axis going from bottom  |
| y1_orig | upper right y-coordinate of the anchor occurence, y-axis going from bottom |
| width   | width of the anchor occurence                                              |
| height  | height of the anchor occurence                                             |
