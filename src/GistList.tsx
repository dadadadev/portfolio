import * as React from 'react';
const {
  useEffect,
} = React;

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-haskell.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-typescript.min';
import 'prismjs/themes/prism-tomorrow.css'

const QUERY = gql`
  { 
    user(login: "dadadadev") {
      gists(first: 10) {
        nodes {
          files {
            encodedName
            encoding
            extension
            name
            size
            text
          }
        }
      }
    }
  }
`;

export default () => {
  const {
    loading,
    error,
    data,
  } = useQuery(QUERY);

  useEffect(() => {
    Prism.highlightAll();
  }, [loading, error, data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>something wrong</p>;
  
  return (
    <>
      <h4>Gists</h4>
      {data.user.gists.nodes.map(gist => (
        gist.files.map(({
          name,
          extension,
          text,
        }, i) => (
          <React.Fragment key={i}>
            <h4>{name}</h4>
            <pre className={`language-${extension.slice(1)}`}> {/* remove '.' from extension */}
              <code>{text}</code>
            </pre>
          </React.Fragment>
        )
      )))}
    </>
  );
};
