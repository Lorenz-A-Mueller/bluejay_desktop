import { headerBarStyles } from '../utils/styles';

type Props = {
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

export default function HeaderBar(props: Props) {
  console.log('props.ticket', props.ticket);
  return (
    <div css={headerBarStyles}>
      <div className="status-square">
        <p>{props.ticket && props.ticket.status}</p>
        <p>{props.ticket && props.ticket.ticket_number}</p>
      </div>
      <div className="customer-id-square">
        <p>customer</p>
        <p>{props.ticket && props.ticket.customer_id}</p>
      </div>
      <div className="priority-square">
        <p>priority</p>
        <p>{props.ticket && props.ticket.priority}</p>
      </div>
      <div className="category-square">
        <p>category</p>
        <p>{props.ticket && props.ticket.category}</p>
      </div>
      <div className="assigned-square">
        <p>assigned</p>
        <p>{props.ticket && props.ticket.assignee_id} </p>
      </div>
    </div>
  );
}
