import { FC } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

type markDownRendererType = {
  content: string;
};

const MarkDownRenderer: FC<markDownRendererType> = ({ content }) => {
  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default MarkDownRenderer;
