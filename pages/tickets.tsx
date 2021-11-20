import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
// import { initializeApollo } from '../apollo/client'; TODO?
import MessagePanel from '../components/MessagePanel';
import SearchBar from '../components/SearchBar';
import SelectCategory from '../components/SelectCategory';
import Sidebar from '../components/SideBar';
import Tile from '../components/Tile';
import logoutIcon from '../public/logout-icon.png';
import refreshIcon from '../public/refresh-icon.jpg';
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
  roleNameFetch,
} from '../utils/queries';
import { ticketsStyles } from '../utils/styles';
import { Priority, Status, Ticket, TicketsProps } from '../utils/types';
import useWindowDimensions from '../utils/useWindowDimensions';

export default function Tickets(props: TicketsProps) {
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [openedTicket, setOpenedTicket] = useState('');
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchBarInput, setSearchBarInput] = useState('');
  const [refreshIconAngle, setRefreshIconAngle] = useState(0);

  // fetch all Data necessary for associating id keys with corresponding data in tiles
  // TODO make 1 query out of those

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
        setCustomers(getCustomerNumbersQueryData.customers);
      },
      fetchPolicy: 'network-only',
    },
  );

  //

  const screenWidth = useWindowDimensions().width;
  const router = useRouter();

  // get all tickets

  const [
    getTickets,
    { error: getAllTicketsQueryError, data: getAllTicketsQueryData },
  ] = useLazyQuery(
    getAllTicketsQuery,

    {
      onError: (err) => {
        console.log('err: ', err);
      },
      // fetchPolicy: 'cache-and-network', // maybe
      fetchPolicy: 'network-only',
    },
  ); // TODO error-handling / loading-handling

  // define a ticketErrorMessage that is displayed when tickets cannot be loaded

  let ticketErrorMessage = '';
  if (
    getAllTicketsQueryError?.networkError &&
    typeof window !== 'undefined' &&
    !window.navigator.onLine
  ) {
    ticketErrorMessage = 'Lost Internet connection. Could not load tickets.';
  } else {
    ticketErrorMessage = 'An Error occurred. Could not load tickets.';
  }

  // refresh every minute automatically

  useEffect(() => {
    getTickets();
    const getTicketsPeriodically = setInterval(() => {
      getTickets();
    }, 1000 * 60);
    return () => clearInterval(getTicketsPeriodically);
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
    onCompleted: () => {
      setShowMessagePanel(false);
      getTickets();
    },
    onError: (error) => {
      console.log('error: ', error);
      router.push('/');
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
      props.setFilter('');

      // router.push('/');
    },
    fetchPolicy: 'network-only',
  });

  const handleTileClick = (ticketId: string) => {
    setShowMessagePanel(true);
    setOpenedTicket(ticketId);
  };

  return (
    <Sidebar
      setFilter={props.setFilter}
      filter={props.filter}
      employee={props.employee}
      isAdmin={props.isAdmin}
    >
      <main css={screenWidth && ticketsStyles(screenWidth)}>
        <div className="top-bar">
          <SelectCategory
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <SearchBar
            setSearchBarInput={setSearchBarInput}
            searchBarInput={searchBarInput}
          />
          <button
            onClick={() => {
              getTickets();
              setRefreshIconAngle(refreshIconAngle + 360);
            }}
            style={{
              transform: `rotate(${refreshIconAngle}deg)`,
              transition: 'transform 1s',
            }}
          >
            <Image src={refreshIcon} alt="two arrows in form of a circle" />
          </button>
          <p style={{ color: 'white' }}>{props.employee.first_name}</p>
          <button onClick={handleLogOutClick}>
            <Image src={logoutIcon} alt="a stylized door with an arrow" />
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
              : props.filter === 'urgent'
              ? 'Urgent Tickets'
              : 'Archive'}
          </h1>
          {getAllTicketsQueryError && <p>{ticketErrorMessage}</p>}
          {getAllTicketsQueryData &&
            getAllTicketsQueryData.tickets.map((ticket: Ticket) => {
              //
              // FILTERS (RENDERING OF A TICKET-TILE) *********

              // don't render if title (lower-cased)  or ticket_number (with or without '#') starts with searchBarInput (lower-cased)

              if (
                searchBarInput &&
                !ticket.title
                  .toLowerCase()
                  .startsWith(searchBarInput.toLowerCase()) &&
                !ticket.ticket_number.startsWith(searchBarInput) &&
                !ticket.ticket_number.slice(1).startsWith(searchBarInput)
              ) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;
              }

              // don't render if a set selectedCategory does not match ticket.category

              if (selectedCategory && ticket.category !== selectedCategory) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;

                // don't render if there is no filter but ticket.status = closed (=> show pending tickets)
              } else if (
                !props.filter &&
                statuses.find((status) => status.id === ticket.status)
                  ?.status_name === 'CLOSED'
              ) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;

                // dont' render if there is a filter of "NEW" or "CLOSED" and that does not correspond to ticket.status
              } else if (
                (props.filter === 'NEW' || props.filter === 'CLOSED') &&
                statuses.find((status) => status.status_name === props.filter)!
                  .id !== ticket.status
              ) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;

                // dont' render if there is a filter of "urgent"  AND that does not correspond to ticket.priority or status of ticket is "closed".
              } else if (
                props.filter === 'urgent' &&
                (priorities.find(
                  (priority) => priority.priority_name === props.filter,
                )!.id !== ticket.priority ||
                  statuses.find((status) => status.id === ticket.status)
                    ?.status_name === 'CLOSED')
              ) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;

                // dont' render if there is a filter of "unassigned" AND ticket.assigneeId exists or status of ticket is "closed".
              } else if (
                props.filter === 'unassigned' &&
                (ticket.assignee_id ||
                  statuses.find((status) => status.id === ticket.status)
                    ?.status_name === 'CLOSED')
              ) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;

                // don't render if employee is not an admin and the ticket is not assigned to them
              } else if (
                !props.isAdmin &&
                ticket.assignee_id !== props.employee.id
              ) {
                return <div key={`tile-key-${ticket.ticket_number}`} />;

                // ***************
              } else {
                return (
                  <Tile
                    key={`tile-key-${ticket.ticket_number}`}
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
                    selectedCategory={selectedCategory}
                  />
                );
              }
            })}
        </div>
      </main>
      {showMessagePanel && (
        <MessagePanel
          openedTicket={openedTicket}
          setShowMessagePanel={setShowMessagePanel}
          setOngoingTicket={setOngoingTicket}
          deleteTicket={deleteTicket}
          closeTicket={closeTicket}
          employee={props.employee}
          employees={employees}
          priorities={priorities}
          isAdmin={props.isAdmin}
        />
      )}
    </Sidebar>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // check whether sessionToken in cookies matches an existing valid token in db

  const sessionToken = context.req.cookies.employeeSessionToken;
  const apiUrl = 'http://localhost:4000/graphql';
  // try {
  const employeeSessionFetchRes = await employeeSessionFetch(
    sessionToken,
    apiUrl,
  );
  const employeeSessionFetchData = await employeeSessionFetchRes.json();
  if (!employeeSessionFetchData.data.employeeSession) {
    return {
      redirect: {
        destination: '/?returnTo=/tickets',
        permanent: false,
      },
    };
  }

  // only if sessions exists in db: fetch data of employee with that session

  const employeeId = employeeSessionFetchData.data.employeeSession.employee_id;
  const employeeDataFetchRes = await employeeDataFetch(employeeId, apiUrl);
  const employeeDataFetchData = await employeeDataFetchRes.json();

  // after that, fetch the name of that employee's role

  const roleNameFetchRes = await roleNameFetch(
    employeeDataFetchData.data.employee.role,
    apiUrl,
  );
  const roleNameFetchData = await roleNameFetchRes.json();

  return {
    props: {
      employee: employeeDataFetchData.data.employee,
      isAdmin: roleNameFetchData.data.role.role_name === 'admin',
    },
  };
};
// catch {
//   return {
//     props: {},
//   };
// }
// };
