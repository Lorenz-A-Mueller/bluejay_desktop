import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { chooseDateBarStyles } from '../utils/styles';
import { ChooseDateBarProps } from '../utils/types';

export default function ChooseDateBar(props: ChooseDateBarProps) {
  const [calendarRange, setCalendarRange] = useState([new Date(), new Date()]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [chooseAllClicked, setChooseAllClicked] = useState(true);

  useEffect(() => {
    if (
      'earliestTicketCreationTimestamp' in props.reportData &&
      chooseAllClicked
    ) {
      setCalendarRange([new Date(1602453600000), new Date(Date.now())]);

      props.setStartDate(1602453600000);
      props.setEndDate(new Date().setHours(23, 59, 59, 999));
    }
  }, [props, chooseAllClicked]);

  // set Dates to date input by user

  useEffect(() => {
    if (
      'earliestTicketCreationTimestamp' in props.reportData &&
      !chooseAllClicked
    ) {
      props.setStartDate(Date.parse(calendarRange[0].toDateString()));
      props.setEndDate(Date.parse(calendarRange[1].toDateString()));
    }
  }, [props, chooseAllClicked, calendarRange]);

  //

  return (
    <div css={chooseDateBarStyles}>
      <button
        className="choose-all-button"
        onClick={() => {
          setChooseAllClicked(true);
          setShowCalendar(false);
          props.getTicketsInTimeFrame();
        }}
      >
        Choose All
      </button>
      <button
        className="calendar-button"
        onClick={() => {
          setChooseAllClicked(false);
          setShowCalendar((previous) => !previous);
        }}
      >
        <img src="calendar-icon.png" alt="a calendar" />
      </button>
      <div className="date-container">
        <button
          className="date-display-button"
          onClick={() => {
            setChooseAllClicked(false);
            setShowCalendar((previous) => !previous);
          }}
        >
          {calendarRange[0].toDateString().slice(4)}&nbsp;---&nbsp;
          {calendarRange[1].toDateString().slice(4)}
        </button>
        <div
          className="calendar-container"
          style={{ display: showCalendar ? 'block' : 'none' }}
        >
          <Calendar
            onChange={setCalendarRange}
            value={calendarRange}
            selectRange={true}
            className="react-calendar"
          />
        </div>
      </div>
    </div>
  );
}
