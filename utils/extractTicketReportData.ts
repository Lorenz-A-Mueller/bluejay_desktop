import { Ticket } from './types';

export default function extractTicketReportData(tickets: Ticket[]) {
  const assignedTicketArray = tickets.filter((ticket) => {
    return ticket.assignee_id;
  });
  const closedTicketArray = tickets.filter((ticket) => {
    return ticket.status === '3';
  });

  return {
    totalTickets: tickets.length || 0,
    assignedTickets: assignedTicketArray.length || 0,
    unassignedTickets: tickets.length - assignedTicketArray.length || 0,
    closedTickets: closedTicketArray.length || 0,
    pendingTickets: tickets.length - closedTicketArray.length || 0,
  };
}
