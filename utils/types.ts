export type Ticket = {
  __typename: string;
  id: string;
  ticket_number: string;
  status: string;
  last_response: string;
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
  filter: string;
};

export type MessagePanelHeaderProps = {
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

export type ChooseDateBarProps = {
  handleChooseAllClick: () => void;
};
export type PieChartContainerProps = {
  keyword: string;
  statusesData?: Status[];
  employeesData?: Employee[];
  categoriesData?: Category[];
  reportData: ReportData;
};

export type TicketReportProps = {
  reportData: ReportData;
};

export type ReportData =
  | {
      totalTickets: number;
      assignedTickets: number;
      unassignedTickets: number;
      closedTickets: number;
      pendingTickets: number;
      byStatus: number[];
      byAssignee: number[];
      byCategory: number[];
      numberOfDays: number;
      earliestTicketCreationTimestamp: number;
      byDay: number[];
    }
  | {};

export type Status = {
  id: string;
  status_name: string;
};

export type Employee = {
  id: string;
  first_name: string;
};

export type Category = {
  id: string;
  category_name: string;
};

export type SideBarProps = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  children: React.ReactNode;
};

export type TicketsProps = {
  employee: {
    first_name: string;
  };
  employeeId: string;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type DataProps = {
  employee: {
    first_name: string;
  };
  employeeId: string;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type MessagePanelProps = {
  openedTicket: string;
  employee: {
    first_name: string;
  };
  employeeId: string | undefined;
  setShowMessagePanel: (arg: boolean) => void;
  closeTicket: () => void;
  deleteTicket: () => void;
  setOngoingTicket: () => void;
};

export type Message = {
  id: string;
  content: string;
  created: string;
  responder_id: string | undefined;
};

export type MessageFieldProps = {
  message: Message | undefined;
  ticketData:
    | {
        customer_id?: string;
      }
    | undefined;
  employee: {
    first_name: string;
  };
};
