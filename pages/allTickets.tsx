import { useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import MessagePanel from '../components/MessagePanel';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Tile from '../components/Tile';
import { employeeSessionFetch, getAllTicketsQuery } from '../utils/queries';
import { allTicketsStyles } from '../utils/styles';
import { Ticket } from '../utils/types';

export default function AllTickets() {
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [openedTicket, setOpenedTicket] = useState('');

  const { data } = useQuery(getAllTicketsQuery); // TODO error-handling / loading-handling

  const handleTileClick = (ticketId: string) => {
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
            data.tickets.map((ticket: Ticket) => (
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const sessionToken = context.req.cookies.employeeSessionToken;
  const apiUrl = 'http://localhost:4000/graphql';
  const res = await employeeSessionFetch(sessionToken, apiUrl);
  const data = await res.json();
  if (!data.data.employeeSession) {
    return {
      redirect: {
        destination: '/?returnTo=/allTickets',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
