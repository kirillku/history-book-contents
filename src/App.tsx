import * as React from "react";
import { groupBy, keyBy } from "lodash";
import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";
import { fetchData, Paragraph, Category } from "./api";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TableRow = styled.tr<{ color: string }>`
  background: ${p => p.color};
`;

const ColumnWrapper = styled.div`
  margin-right: 20px;
`;

interface State {
  paragraphs: Paragraph[];
  categories: Category[];
}

const useData = (): State => {
  const [data, setData] = React.useState<State>({
    paragraphs: [],
    categories: []
  });
  React.useEffect(() => {
    fetchData().then(data => setData(data));
  }, []);

  return data;
};

const App = () => {
  const { paragraphs, categories } = useData();

  const byChapters = groupBy(paragraphs, "chapter");

  const categoriesBySlug = keyBy(categories, "slug");

  return (
    <div>
      <GlobalStyle />
      <h1>Оглавление</h1>
      <Wrapper>
        <ColumnWrapper>
          <h2>Категории</h2>
          <table>
            <tbody>
              {categories.map(category => (
                <TableRow key={category.slug} color={category.color}>
                  <td>{category.name}</td>
                </TableRow>
              ))}
            </tbody>
          </table>
        </ColumnWrapper>
        {Object.entries(byChapters).map(([chapter, chapterParagraphs]) => (
          <ColumnWrapper key={chapter}>
            <h2>Глава {chapter}</h2>
            <table>
              <tbody>
                {chapterParagraphs.map(paragraph => (
                  <TableRow
                    key={paragraph.id}
                    color={categoriesBySlug[paragraph.categorySlug].color}
                  >
                    <td>{paragraph.paragraph}</td>
                    <td>{paragraph.description}</td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </ColumnWrapper>
        ))}
      </Wrapper>
    </div>
  );
};

export default App;
