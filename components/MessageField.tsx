import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { createMessageMutation, getCustomerNameQuery } from '../utils/queries';
import { messageFieldStyles } from '../utils/styles';
import { transformTimestampIntoDatetime } from '../utils/transformTimestampIntoDatetime';

type Props = {
  message:
    | {
        id: string;
        content: string;
        created: string;
        responder_id: string | undefined;
      }
    | undefined;
  ticketData:
    | {
        customer_id: string;
      }
    | undefined;
  employee: {
    first_name: string;
  };
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
      variables: { customerId: props.ticketData?.customer_id },
      onCompleted: () => {
        console.log('data HERE', data);
        setCustomerFirstName(data.customer.first_name);
        setCustomerLastName(data.customer.last_name);
      },
      fetchPolicy: 'network-only',
    },
  );

  console.log('props in Messagefield', props);
  return (
    <div
      css={messageFieldStyles}
      style={{
        flexDirection: props.message.responder_id ? 'row-reverse' : 'row',
      }}
    >
      <div className="info-field">
        <p>
          {props.message.responder_id
            ? props.employee.first_name
            : customerFirstName}
        </p>
        <p>{!props.message.responder_id && customerLastName}</p>
        <p>{dateTime.slice(0, -5)}</p>
        <p>{dateTime.slice(-5)}</p>
      </div>
      <div className="message-display-field">
        {props.message && props.message.content}
      </div>
    </div>
  );
}
