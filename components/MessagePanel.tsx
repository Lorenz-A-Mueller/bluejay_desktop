import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  createMessageMutation,
  getMessageQuery,
  getMessagesQuery,
  getTicketInformationQuery,
} from '../utils/queries';
import { messagePanelStyles } from '../utils/styles';
import HeaderBar from './HeaderBar';
import MessageField from './MessageField';

type Props = {
  openedTicket: string;
};

export default function MessagePanel(props: Props) {
  const [ticketData, setTicketData] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  console.log('messages', messages);

  // query data about clicked-on ticket

  const { loading, error, data } = useQuery(getTicketInformationQuery, {
    variables: { ticketId: props.openedTicket },
    onCompleted: () => {
      console.log(data);
      setTicketData(data.ticket);
      getMessages();
    },
    fetchPolicy: 'network-only',
  });

  const [
    getMessages,
    {
      loading: getMessagesLoading,
      error: getMessagesError,
      data: getMessagesData,
    },
  ] = useLazyQuery(getMessagesQuery, {
    variables: { ticketID: props.openedTicket },
    onCompleted: (getMessagesData) => {
      console.log('data in getMessages: ', getMessagesData);
      setMessages(getMessagesData.messages);
    },
    fetchPolicy: 'network-only',
  });

  // const [
  //   sendMessage,
  //   {
  //     loading: sendMessageLoading,
  //     error: sendMessageError,
  //     data: sendMessageData,
  //   },
  // ] = useLazyQuery(createMessageMutation, {
  //   variables: { customerId: props.message?.customer_id },
  //   onCompleted: () => {
  //     console.log('data HERE', data);
  //     setCustomerFirstName(data.customer.first_name);
  //     setCustomerLastName(data.customer.last_name);
  //   },
  //   fetchPolicy: 'network-only',
  // });

  // useEffect(() => {
  //   if (ticketData.messages) {
  //     checkMessageData();
  //   }
  // }, [ticketData]);

  // const [checkMessageData, { loading: loading2, error: error2, data: data2 }] =
  //   useLazyQuery(getMessageQuery, {
  //     variables: {
  //       messageId: ticketData.messages && ticketData.messages[0],
  //     },
  //     onCompleted: () => {
  //       console.log('retrieved message data: ', data2);
  //       setMessageData(data2);
  //     },
  //     fetchPolicy: 'network-only',
  //   });

  const handleMessageSendClick = () => {
    // sendMessage();
  };

  return (
    <div css={messagePanelStyles}>
      <div className="blue-square">
        <HeaderBar ticket={data && data.ticket} />
        <div className="title-bar">
          <p>{data && data.ticket.title}</p>
        </div>
        {messages.length &&
          messages.map((message) => (
            <MessageField
              key={`message-key-${message.content}`}
              message={message}
              ticketData={ticketData}
            />
          ))}

        <div className="reply-container">
          <textarea
            onChange={(e) => setNewMessageText(e.currentTarget.value)}
            value={setNewMessageText}
          />
          <button onClick={handleMessageSendClick}>Send</button>
        </div>
      </div>
    </div>
  );
}
