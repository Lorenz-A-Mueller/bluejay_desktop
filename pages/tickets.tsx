import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import MessagePanel from '../components/MessagePanel';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Sidebar from '../components/SideBar';
import Tile from '../components/Tile';
import {
  changeTicketStatusMutation,
  deleteSessionMutation,
  deleteTicketMutation,
  employeeDataFetch,
  employeeSessionFetch,
  getAllTicketsQuery,
  getCategoriesQuery,
  getCustomerNumbersQuery,
  getEmployeesQuery,
  getPrioritiesQuery,
  getStatusesQuery,
} from '../utils/queries';
import { ticketsStyles } from '../utils/styles';
import { Ticket, TicketsProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Tickets(props: TicketsProps) {
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [openedTicket, setOpenedTicket] = useState('');
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  // fetch all Data necessary for associating id keys with corresponding data in tiles

  const { data: getPrioritiesQueryData } = useQuery(getPrioritiesQuery, {
    onCompleted: () => {
      setPriorities(getPrioritiesQueryData.priorities);
    },
    fetchPolicy: 'network-only',
  });

  const { data: getStatusesQueryData } = useQuery(getStatusesQuery, {
    onCompleted: () => {
      setStatuses(getStatusesQueryData.statuses);
    },
    fetchPolicy: 'network-only',
  });

  const { data: getCategoriesQueryData } = useQuery(getCategoriesQuery, {
    onCompleted: () => {
      setCategories(getCategoriesQueryData.categories);
    },
    fetchPolicy: 'network-only',
  });

  const { data: getEmployeesQueryData } = useQuery(getEmployeesQuery, {
    onCompleted: () => {
      setEmployees(getEmployeesQueryData.employees);
    },
    fetchPolicy: 'network-only',
  });

  const { data: getCustomerNumbersQueryData } = useQuery(
    getCustomerNumbersQuery,
    {
      onCompleted: () => {
        alert('yes');
        setCustomers(getCustomerNumbersQueryData.customers);
      },
      fetchPolicy: 'network-only',
    },
  );

  //

  const screenWidth = useWindowDimensions().width;
  const router = useRouter();

  const [getTickets, { data: getAllTicketsQueryData }] = useLazyQuery(
    getAllTicketsQuery,
    {
      fetchPolicy: 'network-only',
    },
  ); // TODO error-handling / loading-handling

  useEffect(() => {
    getTickets();
  }, [getTickets]);

  const [deleteSession] = useMutation(deleteSessionMutation, {
    onCompleted: (deleteData) => {
      console.log('deleteSessionMutationData: ', deleteData);
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
    },
    fetchPolicy: 'network-only',
  });

  const handleLogOutClick = () => {
    deleteSession();
  };

  const [closeTicket] = useMutation(changeTicketStatusMutation, {
    variables: { ticketID: openedTicket, statusID: '3' },
    onCompleted: (closedTicketStatusData) => {
      console.log(closedTicketStatusData);
      setTimeout(() => {
        setShowMessagePanel(false);
      }, 500);

      getTickets();
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

  return (
    <Sidebar setFilter={props.setFilter} filter={props.filter}>
      <main css={screenWidth && ticketsStyles(screenWidth)}>
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
          <h1>
            {'filter' in props && props.filter === ''
              ? 'Pending Tickets'
              : props.filter === 'unassigned'
              ? 'Unassigned Tickets'
              : props.filter === 'NEW'
              ? 'New Tickets'
              : 'Archive'}
          </h1>
          {getAllTicketsQueryData &&
            getAllTicketsQueryData.tickets.map((ticket: Ticket) => (
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
                filter={props.filter}
                priorities={priorities}
                categories={categories}
                statuses={statuses}
                employees={employees}
                customers={customers}
              />
            ))}
        </div>
      </main>
      {showMessagePanel && (
        <MessagePanel
          openedTicket={openedTicket}
          employeeId={props.employeeId}
          setShowMessagePanel={setShowMessagePanel}
          setOngoingTicket={setOngoingTicket}
          deleteTicket={deleteTicket}
          closeTicket={closeTicket}
          employee={props.employee}
        />
      )}
    </Sidebar>
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
        destination: '/?returnTo=/tickets',
        permanent: false,
      },
    };
  }
  const employeeId = data.data.employeeSession.employee_id;
  const res2 = await employeeDataFetch(employeeId, apiUrl);
  const data2 = await res2.json();

  return {
    props: {
      employee: data2.data.employee,
      employeeId,
    },
  };
};
