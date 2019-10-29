import * as React from 'react';
const {
  useEffect,
} = React;

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { prismHighlightAll } from '../utils/highlight';

import styled from 'astroturf';

const Param = styled('p')`
  color: blue;
`;

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
    prismHighlightAll();
  }, [loading, error, data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>something wrong</p>;
  
  return (
    <>
      <Param>test</Param>
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
