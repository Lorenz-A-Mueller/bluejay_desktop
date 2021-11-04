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

export const deleteSessionMutation = gql`
  mutation ($employee_id: ID!) {
    deleteEmployeeSession(employee_id: $employee_id) {
      id
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
    ticket(id: $ticketId) {
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
