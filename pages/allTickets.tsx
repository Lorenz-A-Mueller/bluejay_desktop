import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useApolloClient,
  useLazyQuery,
  useQuery,
} from '@apollo/client';
import { useState } from 'react';
import Layout from '../components/Layout';
import MessagePanel from '../components/MessagePanel';
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
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [openedTicket, setOpenedTicket] = useState('');

  const { loading, error, data } = useQuery(getAllTicketsQuery, {
    onCompleted: () => {
      console.log('data', data);
    },
    onError: () => {
      console.log('error: ', error);
    },
    // skip:
  });
  const handleTileClick = (ticketId: string) => {
    console.log('ticketId', ticketId);
    console.log(typeof ticketId);
    setShowMessagePanel((previous) => !previous);
    setOpenedTicket(ticketId);
  };

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
              <Tile
                key={`tile-key-${ticket.created}`}
                ticketId={ticket.id}
                status={ticket.status}
                ticketNumber={ticket.ticket_number}
                title={ticket.title}
                created={ticket.created}
                lastResponse={ticket.last_response}
                category={ticket.category}
                priority={ticket.priority}
                assigneeId={ticket.assignee_id}
                customerId={ticket.customer_id}
                handleTileClick={handleTileClick}
              />
            ))}
        </div>
      </main>
      {showMessagePanel && <MessagePanel openedTicket={openedTicket} />}
    </Layout>
  );
}
