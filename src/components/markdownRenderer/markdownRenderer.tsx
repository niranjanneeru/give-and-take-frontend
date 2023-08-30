import { FC } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

type markDownRendererType = {
  content: string;
};

const MarkDownRenderer: FC<markDownRendererType> = ({ content }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
};

export default MarkDownRenderer;
