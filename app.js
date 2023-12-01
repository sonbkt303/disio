const XLSX = require("xlsx");
const fs = require("fs");

const START_FILE_KEYWORD_EN = 'Start of the file';
const START_FILE_KEYWORD_FR = "Début du fichier";

const DATA_OBJECT_ARRAY = "array_object";
const DATA_TWO_DIMENSION_ARRAY = "two_dimension_array";


const writeJsonFile = ({ data = [], fileName = ""}) => {
    const dir = './output';

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(`./output/${fileName}.json`, JSON.stringify(data));

    console.log('Write file successfully');
}

const convertTwoDimensionalJsonData = ({ twoDimensionArr = []}) => {
    const jsonData = [];
    twoDimensionArr.forEach(row => {
        const key = row[0];
        const value = row[1];

        jsonData.push({
            key,
            value
        })
    });

    return jsonData;
};

const startFileFromIndex = ({ data, key = ''}) => {
    const startFileIndex = data.findIndex(o => o.key === key);

    return startFileIndex + 1;
}

const getContentDataFromIndex = ({ data = [], fileStartFromIndex, dataTye = "" }) => {
    const arrayLength = data.length;

    if(dataTye === DATA_OBJECT_ARRAY) {
        return data.splice(fileStartFromIndex, arrayLength);
    }

    return data.splice(fileStartFromIndex, arrayLength).filter(o => o.length);
}

const main = ({ path }) => {
  const workbook = XLSX.readFile(path);
  const sheet_name_list = workbook.SheetNames;

  sheet_name_list.forEach(async sheet_name => {

    if(sheet_name) {
        let worksheet = workbook.Sheets[sheet_name];
        const twoDimensionRawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const jsonData = convertTwoDimensionalJsonData({ twoDimensionArr: twoDimensionRawData });
        const startFileKeyWord = sheet_name === "En" ? START_FILE_KEYWORD_EN : START_FILE_KEYWORD_FR;

        const fileStartFromIndex = startFileFromIndex({ data: jsonData, key: startFileKeyWord });

        const jsonContentData = getContentDataFromIndex({ data: jsonData, fileStartFromIndex, dataTye: DATA_OBJECT_ARRAY });
        const twoDimensionContentData = getContentDataFromIndex({ data: twoDimensionRawData, fileStartFromIndex, dataTye: DATA_TWO_DIMENSION_ARRAY });

        await writeJsonFile({ data: jsonContentData, fileName: `${sheet_name}-disio-json` });
        await writeJsonFile({ data: twoDimensionContentData, fileName: `${sheet_name}-disio-two-dimension` });
    }
  })
};

const data = main({ path: "./DSIO.xlsx" });

