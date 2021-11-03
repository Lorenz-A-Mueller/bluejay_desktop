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
      messages
    }
  }
`;
