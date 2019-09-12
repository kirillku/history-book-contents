import * as React from "react";
import { groupBy } from "lodash";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import { fetchData, Paragraph } from "./api";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface State {
  paragraphs: Paragraph[];
}

const useData = (): State => {
  const [data, setData] = React.useState<State>({ paragraphs: [] });
  React.useEffect(() => {
    fetchData().then(data => setData(data));
  }, []);

  return data;
};

const App = () => {
  const { paragraphs } = useData();

  const byChapters = groupBy(paragraphs, "chapter");

  return (
    <div>
      <GlobalStyle />
      <h1>Оглавление</h1>
      <Wrapper>
        {Object.entries(byChapters).map(([chapter, chapterParagraphs]) => (
          <div key={chapter}>
            <h2>Глава {chapter}</h2>
            <table>
              <tbody>
                {chapterParagraphs.map(paragraph => (
                  <tr key={paragraph.id}>
                    <td>{paragraph.paragraph}</td>
                    <td>{paragraph.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </Wrapper>
    </div>
  );
};

export default App;
