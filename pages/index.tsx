import { ReactElement, useEffect, useState, createElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  grid-gap: 64px;
`;

const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
`;

const IconsRow = styled.div`
  padding: 64px 0;
`;

const Textarea = styled.textarea`
  min-height: 250px;
`;

const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  border: 1px solid #ccc;
  text-align: center;
`;

const Icon = styled.div`
  padding: 0 32px 32px;
  svg {
    width: 100%;
  }
`;

const Id = styled.div`
  font-style: italic;
`;

const Title = styled.div`
  font-weight: bold;
`;

const defaultSymbols = `
  <symbol id="icon-facebook" viewBox="0 0 32 32">
    <title>facebook</title>
    <path d="M18 11v-4c0-1.104 0.896-2 2-2h2v-5h-4c-3.314 0-6 2.686-6 6v5h-4v5h4v16h6v-16h4l2-5h-6z"></path>
  </symbol>
  <symbol id="icon-instagram" viewBox="0 0 32 32">
    <title>instagram</title>
    <path d="M22 0h-12c-5.522 0-10 4.478-10 10v12c0 5.522 4.478 10 10 10h12c5.522 0 10-4.478 10-10v-12c0-5.522-4.478-10-10-10zM29 22c0 3.86-3.14 7-7 7h-12c-3.86 0-7-3.14-7-7v-12c0-3.86 3.14-7 7-7h12c3.86 0 7 3.14 7 7v12z"></path>
    <path d="M16 8c-4.418 0-8 3.582-8 8s3.582 8 8 8c4.418 0 8-3.582 8-8s-3.582-8-8-8zM16 21c-2.756 0-5-2.244-5-5 0-2.758 2.244-5 5-5s5 2.242 5 5c0 2.756-2.244 5-5 5z"></path>
    <path d="M24.6 8.466c0.589 0 1.066-0.477 1.066-1.066s-0.477-1.066-1.066-1.066c-0.589 0-1.066 0.477-1.066 1.066s0.477 1.066 1.066 1.066z"></path>
  </symbol>
  <symbol id="icon-twitter" viewBox="0 0 32 32">
    <title>twitter</title>
    <path d="M32 6.078c-1.19 0.522-2.458 0.868-3.78 1.036 1.36-0.812 2.398-2.088 2.886-3.626-1.268 0.756-2.668 1.29-4.16 1.588-1.204-1.282-2.92-2.076-4.792-2.076-3.632 0-6.556 2.948-6.556 6.562 0 0.52 0.044 1.020 0.152 1.496-5.454-0.266-10.28-2.88-13.522-6.862-0.566 0.982-0.898 2.106-0.898 3.316 0 2.272 1.17 4.286 2.914 5.452-1.054-0.020-2.088-0.326-2.964-0.808 0 0.020 0 0.046 0 0.072 0 3.188 2.274 5.836 5.256 6.446-0.534 0.146-1.116 0.216-1.72 0.216-0.42 0-0.844-0.024-1.242-0.112 0.85 2.598 3.262 4.508 6.13 4.57-2.232 1.746-5.066 2.798-8.134 2.798-0.538 0-1.054-0.024-1.57-0.090 2.906 1.874 6.35 2.944 10.064 2.944 12.072 0 18.672-10 18.672-18.668 0-0.29-0.010-0.57-0.024-0.848 1.302-0.924 2.396-2.078 3.288-3.406z"></path>
  </symbol>
`;

function useParseSymbols(value: string) {
  const [parsedSymbols, setParsedSymbols] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const temp = document.createElement('template') as HTMLTemplateElement;
    temp.innerHTML = value;
    const symbolsHTML = Array.from(
      temp.content.querySelectorAll<HTMLElement>('symbol'),
    );
    setParsedSymbols(symbolsHTML);
  }, [value]);

  return parsedSymbols;
}

type SVGElementObj = [ReactElement, string, string];

function useIcons(items: HTMLElement[]) {
  const [relements, setRItems] = useState<SVGElementObj[]>([]);

  useEffect(() => {
    setRItems(() => {
      return items.map((item) => {
        const title = item.querySelector('title');
        const paths = item.querySelectorAll('path');

        const element = createElement(
          'svg',
          {
            viewBox: item.getAttribute('viewBox'),
          },
          Array.from(paths).map((path) =>
            createElement('path', {
              d: path?.getAttribute('d'),
            }),
          ),
        );

        return [
          element,
          item.getAttribute('id') || '',
          title?.textContent || '',
        ];
      });
    });
  }, [items]);

  return relements;
}

export default function HomePage() {
  const [symbolsString, setSymbolsString] = useState(defaultSymbols);
  const parsedSymbols = useParseSymbols(symbolsString);
  const icons = useIcons(parsedSymbols);

  return (
    <Container>
      <div>
        <p>Paste your symbols</p>
        <Textarea
          value={symbolsString}
          onChange={({ target }) => setSymbolsString(target.value)}
        />
      </div>

      <IconsRow>
        <IconsGrid>
          {icons.map((icon) => (
            <Cell key={Math.random()}>
              <Icon>{icon[0]}</Icon>
              <Id>id: {icon[1]}</Id>
              {icon[2] && <Title>title: {icon[2]}</Title>}
            </Cell>
          ))}
        </IconsGrid>
      </IconsRow>
    </Container>
  );
}
