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
  priorities: Priority[];
  statuses: Status[];
  categories: Category[];
  employees: Employee[];
  customers: Customer[];
};

export type Customer = {
  number: string;
};

export type Priority = {
  id: string;
  priority_name: string;
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
  isAdmin: boolean;
};

export type ChooseDateBarProps = {
  getTicketsInTimeFrame: () => void;
  reportData: ReportData;
  setStartDate: React.Dispatch<React.SetStateAction<number>>;
  setEndDate: React.Dispatch<React.SetStateAction<number>>;
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
  startDate: number;
  endDate: number;
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
  role: number;
};

export type Category = {
  id: string;
  category_name: string;
};

export type Role = {
  id: string;
  role_name: string;
};

export type SideBarProps = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  employee: Employee;
  isAdmin: boolean;
  children: React.ReactNode;
};

export type TicketsProps = {
  employee: Employee;
  filter: string;
  isAdmin: boolean;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type DataProps = {
  employee: Employee;
  filter: string;
  isAdmin: boolean;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export type MessagePanelProps = {
  openedTicket: string;
  employee: Employee;
  setShowMessagePanel: (arg: boolean) => void;
  closeTicket: () => void;
  deleteTicket: () => void;
  setOngoingTicket: () => void;
  isAdmin: boolean;
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
  employee: Employee;
};
