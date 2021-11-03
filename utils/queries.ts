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
      messages
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
