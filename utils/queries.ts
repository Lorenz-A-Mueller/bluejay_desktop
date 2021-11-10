import { gql } from '@apollo/client';

export const employeeSessionFetch = async (
  sessionToken: string,
  apiUrl: string,
) => {
  const data = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', cookie: sessionToken },
    body: JSON.stringify({
      query: `query {
        employeeSession {
          id
          employee_id
        }
      }`,
    }),
  });
  return data;
};

export const employeeDataFetch = async (employeeId: string, apiUrl: string) => {
  console.log('employeeId', employeeId);
  const data = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
        employee(search: {id: ${employeeId}}) {
          id
          first_name
        }
      }`,
    }),
  });
  return data;
};

export const logInValidationQuery = gql`
  query ($employeeNumber: String!, $employeePassword: String!) {
    employee(search: { number: [$employeeNumber, $employeePassword] }) {
      first_name
    }
  }
`;

export const getCustomerNumberQuery = gql`
  query ($idInput: ID!) {
    customer(search: { id: $idInput }) {
      number
    }
  }
`;

export const getCustomerNumbersQuery = gql`
  query {
    customers {
      number
    }
  }
`;

export const getAllTicketsQuery = gql`
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
    }
  }
`;

export const getTicketsInTimeFrameQuery = gql`
  query ($intervalStart: String!, $intervalEnd: String!) {
    ticketsByTimeFrame(startTime: $intervalStart, endTime: $intervalEnd) {
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
    }
  }
`;

export const deleteSessionMutation = gql`
  mutation {
    deleteEmployeeSession {
      id
      token
      employee_id
      expiry_timestamp
    }
  }
`;

export const getCustomerNameQuery = gql`
  query ($customerId: ID) {
    customer(search: { id: $customerId }) {
      first_name
      last_name
    }
  }
`;

export const getTicketInformationQuery = gql`
  query ($ticketId: ID) {
    ticket(search: { id: $ticketId }) {
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
    }
  }
`;
export const getMessageQuery = gql`
  query ($messageId: ID) {
    message(id: $messageId) {
      created
      content
      customer_id
    }
  }
`;

export const createMessageMutation = gql`
  mutation ($ticketID: ID!, $content: String!) {
    createNewMessage(ticket_id: $ticketID, content: $content) {
      id
    }
  }
`;

export const createMessageWithResponderIdMutation = gql`
  mutation ($ticketID: ID!, $content: String!, $responderID: ID!) {
    createNewMessageWithResponderId(
      ticket_id: $ticketID
      content: $content
      responder_id: $responderID
    ) {
      id
      responder_id
    }
  }
`;

export const getMessagesQuery = gql`
  query ($ticketID: ID) {
    messages(ticket_id: $ticketID) {
      created
      content
      id
      responder_id
    }
  }
`;

export const deleteTicketMutation = gql`
  mutation ($ticketID: ID!) {
    deleteTicket(id: $ticketID) {
      id
      title
    }
  }
`;

export const getStatusQuery = gql`
  query ($statusID: ID!) {
    status(id: $statusID) {
      id
      status_name
    }
  }
`;

export const changeTicketStatusMutation = gql`
  mutation ($ticketID: ID!, $statusID: ID!) {
    changeTicketStatus(id: $ticketID, status: $statusID) {
      status
    }
  }
`;

export const getStatusesQuery = gql`
  query {
    statuses {
      id
      status_name
    }
  }
`;

export const getEmployeesQuery = gql`
  query {
    employees {
      id
      first_name
    }
  }
`;

export const getCategoriesQuery = gql`
  query {
    categories {
      id
      category_name
    }
  }
`;

export const getCategoryQuery = gql`
  query ($categoryID: ID!) {
    category(id: $categoryID) {
      id
      category_name
    }
  }
`;

export const getPrioritiesQuery = gql`
  query {
    priorities {
      id
      priority_name
    }
  }
`;

export const getMessagePanelInfoQuery = gql`
  query (
    $statusID: ID!
    $customerID: ID!
    $priorityID: ID!
    $categoryID: ID!
    $assigneeID: ID!
  ) {
    status(id: $statusID) {
      status_name
    }
    customer(search: { id: $customerID }) {
      number
    }
    priority(id: $priorityID) {
      priority_name
    }
    category(id: $categoryID) {
      category_name
    }
    employee(search: { id: $assigneeID }) {
      first_name
    }
  }
`;
