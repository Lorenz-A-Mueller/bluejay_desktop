import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { getStatusQuery } from '../utils/queries';
import { chooseDateBarStyles } from '../utils/styles';
import { ChooseDateBarProps } from '../utils/types';

export default function ChooseDateBar(props: ChooseDateBarProps) {
  return (
    <div css={chooseDateBarStyles}>
      <button
        className="choose-all-button"
        onClick={() => props.handleChooseAllClick()}
      >
        Choose All
      </button>
      <button className="calendar-button">
        <img src="calendar-icon.png" alt="a calendar" />
      </button>
      <button className="date-display-button">08/08/2021 - 31/10/2021</button>
    </div>
  );
}
