import { get } from "lodash";

const RANGES = "Оглавление";

const api = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREADSHEET_ID}/values:batchGet?ranges=${RANGES}&majorDimension=ROWS&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

export interface Paragraph {
  id: string;
  chapter: string;
  paragraph: string;
  description: string;
  timeRange: string;
  aberge: string;
  subjective: string;
}

const getParagraphs = (data: any): Paragraph[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [headings, ...rawParagraphs]: (string[])[] = get(
    data,
    "valueRanges[0].values",
    []
  );
  const paragraphs = rawParagraphs.map(values => ({
    id: values[0],
    chapter: values[1],
    paragraph: values[2],
    description: values[3],
    timeRange: values[4],
    aberge: values[5],
    subjective: values[6]
  }));
  return paragraphs;
};

export const fetchData = () =>
  fetch(api)
    .then(res => res.json())
    .then(data => {
      const paragraphs = getParagraphs(data);
      return { paragraphs };
    });
