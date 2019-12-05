import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs';
import { prismHighlightAll } from '../utils/highlight';
import styled from 'astroturf';

const Test = styled('div')``;

const QUERY = gql`
  { 
    user(login: "dadadadev") {
      gists(first: 10) {
        nodes {
          updatedAt,
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

  const gistNodes = data.user.gists.nodes;
  gistNodes.sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1);
  
  return (
    <>
      <h4>Gists</h4>
      {gistNodes.map(gist => (
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
            <time dateTime={dayjs(gist.updatedAt).format()}>{`Last updated: ${dayjs(gist.updatedAt).format('YYYY-M-D(Z)')}`}</time>
          </React.Fragment>
        )
      )))}
    </>
  );
};
