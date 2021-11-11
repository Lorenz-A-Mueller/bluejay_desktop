import { calculateNumberOfDays } from './calculateNumberOfDays';
import { Ticket } from './types';

export default async function extractTicketReportData(
  tickets: Ticket[],
  startTimestamp: number,
  endTimestamp: number,
) {
  const apiUrl = 'http://localhost:4000/graphql';

  // query statuses in order to get number of available statuses

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
          statuses {
            id
          }
        }`,
    }),
  });
  const data = await res.json();
  const statusesLength = data.data.statuses.length;

  const byStatusArray = new Array(statusesLength).fill(0);
  tickets.forEach((ticket) => {
    byStatusArray[Number(ticket.status) - 1] += 1;
  });

  // query categories in order to get number of available categories

  const res2 = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
          categories {
            id
          }
        }`,
    }),
  });
  const data2 = await res2.json();
  const categoriesLength = data2.data.categories.length;

  const byCategoryArray = new Array(categoriesLength).fill(0);
  tickets.forEach((ticket) => {
    byCategoryArray[Number(ticket.category) - 1] += 1;
  });

  // query employees in order to get number of available assignees

  const res3 = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query {
            employees {
              id
            }
          }`,
    }),
  });
  const data3 = await res3.json();
  const employeesLength = data3.data.employees.length;

  const byAssigneeArray = new Array(employeesLength).fill(0);
  tickets.forEach((ticket) => {
    if (ticket.assignee_id) {
      // exclude null values
      byAssigneeArray[Number(ticket.assignee_id) - 1] += 1;
    }
  });

  // get arrays that only contain assigned/closed tickets -> can derive number with ".length"

  const assignedTicketArray = tickets.filter((ticket) => {
    return ticket.assignee_id;
  });
  const closedTicketArray = tickets.filter((ticket) => {
    return ticket.status === '3';
  });

  // get number of days since earliest ticket

  let earliestTimestamp: number = Date.now();

  for (const ticket of tickets) {
    if (earliestTimestamp > Number(ticket.created)) {
      earliestTimestamp = Number(ticket.created);
    }
  }

  //

  let latestTimestamp: number = earliestTimestamp;

  for (const ticket of tickets) {
    if (latestTimestamp < Number(ticket.created)) {
      latestTimestamp = Number(ticket.created);
    }
  }

  const numberOfDays = calculateNumberOfDays(startTimestamp, endTimestamp);

  //

  const byDayArray = new Array(numberOfDays + 1).fill(0);
  tickets.forEach((ticket) => {
    const passedDaysSinceEarliestDate =
      calculateNumberOfDays(startTimestamp, Number(ticket.created)) - 1;

    byDayArray[passedDaysSinceEarliestDate] += 1;
  });

  //

  return {
    totalTickets: tickets.length || 0,
    assignedTickets: assignedTicketArray.length || 0,
    unassignedTickets: tickets.length - assignedTicketArray.length || 0,
    closedTickets: closedTicketArray.length || 0,
    pendingTickets: tickets.length - closedTicketArray.length || 0,
    byStatus: byStatusArray,
    byCategory: byCategoryArray,
    byAssignee: byAssigneeArray,
    earliestTicketCreationTimestamp: earliestTimestamp,
    byDay: byDayArray,
  };
}
