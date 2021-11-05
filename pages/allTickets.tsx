import { useLazyQuery, useMutation } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import MessagePanel from '../components/MessagePanel';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Tile from '../components/Tile';
import {
  changeTicketStatusMutation,
  deleteSessionMutation,
  deleteTicketMutation,
  employeeDataFetch,
  employeeSessionFetch,
  getAllTicketsQuery,
  getTicketInformationQuery,
} from '../utils/queries';
import { allTicketsStyles } from '../utils/styles';
import { Ticket } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

type AllTicketsProps = {
  employee: {
    first_name: string;
  };
  employeeId: string;
};

export default function AllTickets(props: AllTicketsProps) {
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [openedTicket, setOpenedTicket] = useState('');
  const screenWidth = useWindowDimensions().width;
  const router = useRouter();

  console.log('OPENED TICKET', openedTicket);

  const [getTickets, { data }] = useLazyQuery(getAllTicketsQuery, {
    fetchPolicy: 'network-only',
  }); // TODO error-handling / loading-handling

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  const [logOut] = useMutation(deleteSessionMutation, {
    variables: { employee_id: props.employeeId },
    onCompleted: (deletedData) => {
      console.log(deletedData);
      router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const [deleteTicket] = useMutation(deleteTicketMutation, {
    variables: { ticketID: openedTicket },
    onCompleted: (deletedTicketData) => {
      console.log(deletedTicketData);
      setShowMessagePanel(false);
      getTickets();

      // router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const [closeTicket] = useMutation(changeTicketStatusMutation, {
    variables: { ticketID: openedTicket, statusID: '3' },
    onCompleted: (closedTicketStatusData) => {
      console.log(closedTicketStatusData);
      setTimeout(() => {
        setShowMessagePanel(false);
      }, 500);

      getTickets();

      // router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const [setOngoingTicket] = useMutation(changeTicketStatusMutation, {
    variables: { ticketID: openedTicket, statusID: '2' },
    onCompleted: (ongoingTicketData) => {
      console.log(ongoingTicketData);
      getTickets();

      // router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const handleTileClick = (ticketId: string) => {
    setShowMessagePanel(true);
    setOpenedTicket(ticketId);
  };

  const handleLogOutClick = () => {
    logOut();
  };

  const handleTicketDeleteClick = () => {
    deleteTicket();
  };

  const handleTicketCloseClick = () => {
    closeTicket();
  };

  return (
    <Layout>
      <main css={screenWidth && allTicketsStyles(screenWidth)}>
        <div className="top-bar">
          <SelectCategory />
          <SearchBar />
          <button onClick={() => getTickets()}>
            <img src="refresh-icon.jpg" alt="two arrows in form of a circle" />
          </button>
          <p style={{ color: 'white' }}>{props.employee.first_name}</p>
          <button onClick={handleLogOutClick}>
            <img src="logout-icon.png" alt="a stylized door with an arrow" />
          </button>
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
      {showMessagePanel && (
        <MessagePanel
          openedTicket={openedTicket}
          employee={props.employee}
          employeeId={props.employeeId}
          setShowMessagePanel={setShowMessagePanel}
          handleTicketDeleteClick={handleTicketDeleteClick}
          handleTicketCloseClick={handleTicketCloseClick}
          setOngoingTicket={setOngoingTicket}
        />
      )}
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
  console.log('data.data.employeeSession', data.data.employeeSession);
  const employeeId = data.data.employeeSession.employee_id;
  const res2 = await employeeDataFetch(employeeId, apiUrl);
  const data2 = await res2.json();
  console.log('data2', data2);

  return {
    props: {
      employee: data2.data.employee,
      employeeId,
    },
  };
};
