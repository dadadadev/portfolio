import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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
    data
  } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>something wrong</p>;
  
  const gists = data.user.gists.nodes;
  return (
    <>
      {gists.map(gist => (
        gist.files.map((data, i) => (
          <React.Fragment key={i}>
            <div>{data.name}</div>
          </React.Fragment>
        )
      )))}
    </>
  );
};
