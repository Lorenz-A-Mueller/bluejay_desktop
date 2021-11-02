import { gql, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { messageFieldStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';

const getCustomerNameQuery = gql`
  query ($customerId: ID) {
    customer(search: { id: $customerId }) {
      first_name
      last_name
    }
  }
`;
// const getCustomerNameQuery = gql`
//   query {
//     customer(search: { id: "1" }) {
//       first_name
//       last_name
//     }
//   }
// `;

type Props = {
  openedTicket: string;
  message:
    | {
        content: string;
        created: string;
        customer_id: string;
      }
    | undefined;
};

export default function MessageField(props: Props) {
  const [dateTime, setDateTime] = useState('');
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');

  // convert "created" timestamp into datetime

  useEffect(() => {
    if (props.message) {
      setDateTime(transformTimestampIntoDatetime(props.message.created));
      console.log('props.message.customer_id', props.message);
      getCustomerName();
    }
  }, [props.message]);

  const [getCustomerName, { loading, error, data }] = useLazyQuery(
    getCustomerNameQuery,
    {
      variables: { customerId: props.message?.customer_id },
      onCompleted: () => {
        console.log('data HERE', data);
        setCustomerFirstName(data.customer.first_name);
        setCustomerLastName(data.customer.last_name);
      },
    },
  );

  console.log('props in Messagefield', props);
  return (
    <div css={messageFieldStyles}>
      <div className="info-field">
        <p>{customerFirstName}</p>
        <p>{customerLastName}</p>
        <p>{dateTime.slice(0, -5)}</p>
        <p>{dateTime.slice(-5)}</p>
      </div>
      <div className="message-display-field">
        {props.message && props.message.content}
      </div>
    </div>
  );
}
