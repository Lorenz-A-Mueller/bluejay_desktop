import { tileStyles } from '../utils/styles';
import useWindowDimensions from '../utils/useWindowDimensions';

type Props = {
  status: string;
  title: string;
};

export default function Tile(props: Props) {
  const screenWidth = useWindowDimensions().width;
  return (
    <div css={tileStyles(screenWidth)}>
      <div className="rectangular-box">
        <div className="status-box">
          <p>{props.status}</p>
        </div>
        <div className="title-box">
          <p>{props.title} (2) </p>
        </div>
        <div className="ticket-number-box">
          <p>#3333333333 </p>
        </div>
        <div className="last-response-box">
          <p>last Response</p>
          <p>
            yesterday <span>12:12pm</span>
          </p>
        </div>
        <div className="customer-id-box">
          <p>customer ID</p>
          <p>0000000001</p>
        </div>
        <div className="category-box">
          <p>category</p>
          <p>Complaint</p>
        </div>
        <div className="priority-box">
          <p>priority</p>
          <p>Urgent</p>
        </div>
        <div className="created-box">
          <p>created</p>
          <p>
            12/07/2021 <span>12:12pm</span>
          </p>
        </div>
        <div className="assigned-box">
          <div>
            <p>assigned</p>
            <p>Jennifer</p>
          </div>
          <img src="person.png" alt="a person" />
          <div className="assigned-date-box">
            <p>12/07/2021</p>
            <p>13:24pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
