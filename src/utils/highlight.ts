import * as Prism from 'prismjs';
import 'prismjs/components/prism-haskell.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/themes/prism-tomorrow.css'

export const prismHighlightAll = () => {
  Prism.highlightAll();
};
