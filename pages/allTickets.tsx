import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Tile from '../components/Tile';
import { allTicketsStyles } from '../utils/styles';

const getAllTicketsQuery = gql`
  query {
    tickets {
      id
      ticket_number
      status
      last_response
      customer_id
      category
      priority
      created
      assignee_id
      title
      messages
    }
  }
`;

export default function AllTickets() {
  const { loading, error, data } = useQuery(getAllTicketsQuery, {
    onCompleted: () => {
      console.log('data', data);
    },
    onError: () => {
      console.log('error: ', error);
    },
    // skip:
  });

  return (
    <Layout>
      <main css={allTicketsStyles}>
        <div className="top-bar">
          <SelectCategory />
          <SearchBar />
        </div>
        <div className="tile-area">
          {data &&
            data.tickets.map((ticket) => (
              <Tile key="abc" status={ticket.status} title={ticket.title} />
            ))}
          {/* <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile />
          <Tile /> */}
        </div>
      </main>
    </Layout>
  );
}
