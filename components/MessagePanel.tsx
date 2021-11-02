import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { messagePanelStyles } from '../utils/styles';
import HeaderBar from './HeaderBar';
import MessageField from './MessageField';

type Props = {
  openedTicket: string;
};

const getTicketInformationQuery = gql`
  query ($ticketId: ID) {
    ticket(id: $ticketId) {
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
const getMessageQuery = gql`
  query ($messageId: ID) {
    message(id: $messageId) {
      created
      content
      customer_id
    }
  }
`;

// const getMessageQuery = gql`
//   query {
//     message(id: "1") {
//       created
//       content
//     }
//   }
// `;

export default function MessagePanel(props: Props) {
  const [ticketData, setTicketData] = useState({});
  const [messageData, setMessageData] = useState({});
  // query data about clicked-on ticket
  const { loading, error, data } = useQuery(getTicketInformationQuery, {
    variables: { ticketId: props.openedTicket },
    onCompleted: () => {
      console.log(data);
      setTicketData(data.ticket);
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (ticketData.messages) {
      checkMessageData();
    }
  }, [ticketData]);

  const [checkMessageData, { loading: loading2, error: error2, data: data2 }] =
    useLazyQuery(getMessageQuery, {
      variables: {
        messageId: ticketData.messages && ticketData.messages[0],
      },
      onCompleted: () => {
        console.log('retrieved message data: ', data2);
        setMessageData(data2);
      },
      fetchPolicy: 'network-only',
    });

  return (
    <div css={messagePanelStyles}>
      <div className="blue-square">
        <HeaderBar ticket={data && data.ticket} />
        <div className="title-bar">
          <p>{data && data.ticket.title}</p>
        </div>
        {}
        <MessageField message={messageData && messageData.message} />
        <div className="reply-container">
          <textarea />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
