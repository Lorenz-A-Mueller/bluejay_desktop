export type Ticket = {
  __typename: string;
  id: string;
  ticket_number: string;
  status: string;
  last_response: string;
  messages: [number];
  priority: string;
  title: string;
  customer_id: string;
  created: string;
  assignee_id: string;
  category: string;
};

export type TileProps = {
  ticketId: string;
  status: string;
  title: string;
  created: string;
  lastResponse: string;
  category: string;
  priority: string;
  assigneeId: string;
  customerId: string;
  ticketNumber: string;
  handleTileClick: (arg0: string) => void;
};

export type HeaderProps = {
  ticket:
    | {
        status: string;
        priority: string;
        category: string;
        assignee_id: string;
        ticket_number: string;
        customer_id: string;
      }
    | undefined;
};
