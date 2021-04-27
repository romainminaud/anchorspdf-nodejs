// Import PDFExtract
const PDFExtract = require("pdf.js-extract").PDFExtract;

class AnchorsParser {
  constructor(left_delimiter, right_delimiter, password) {
    this.left_delimiter = left_delimiter;
    this.right_delimiter = right_delimiter;
    this.password = password || null;
  }

  async parse_file(buffer_file) {
    const options = {
      password: this.password,
    };

    const pdfExtract = new PDFExtract();

    try {
      const data = await pdfExtract.extractBuffer(buffer_file, options);
      let fields = {};
      for (let i = 0; i < data.pages.length; i++) {
        for (let j = 0; j < data.pages[i].content.length; j++) {
          if (data.pages[i].content[j].str.startsWith(this.left_delimiter)) {
            var anchor = data.pages[i].content[j].str
              .split(this.left_delimiter)[1]
              .split(this.right_delimiter)[0];

            let coordinates = {
              x0: Math.floor(data.pages[i].content[j].x),
              x1: Math.floor(
                data.pages[i].content[j].x + data.pages[i].content[j].width
              ),
              y0: Math.floor(data.pages[i].content[j].y),
              y1: Math.floor(
                data.pages[i].content[j].y + data.pages[i].content[j].height
              ),
              y0_orig:
                data.pages[i].pageInfo.height -
                Math.floor(data.pages[i].content[j].y),
              y1_orig:
                data.pages[i].pageInfo.height -
                Math.floor(
                  data.pages[i].content[j].y - data.pages[i].content[j].height
                ),
              width: Math.floor(data.pages[i].content[j].width),
              height: Math.floor(data.pages[i].content[j].height),
              page: i + 1,
            };

            if (!fields[anchor]) {
              fields[anchor] = [];
            }

            fields[anchor].push(coordinates);
          }
        }
      }
      return fields;
    } catch (e) {
      return e.message;
    }
  }
}

module.exports = AnchorsParser;
