import { css } from '@emotion/react';

const blue = '#2799E0';
const darkGray = '#999999';
const middleGray = '#C4C4C4';
const lightGray = '#E5E5E5';
const orange = '#FFC671';
const green = '#89FF89';
const red = '#FF8484';

// standard width: 1440, standard height: 1024 (see figma)

const scale = {
  1: 1,
  2: 2,
  3: 4,
  4: 6,
  5: 8,
  6: 12,
  7: 16,
  8: 20,
  9: 26,
  10: 32,
  11: 40,
  12: 48,
  13: 56,
  14: 68,
  15: 80,
  16: 92,
  17: 108,
  18: 124,
  19: 148,
  20: 172,
  21: 204,
  22: 236,
  23: 284,
  24: 332,
  25: 400,
  26: 512,
  27: 624,
  28: 800,
  29: 1024,
  30: 1248,
};

export const globalStyles = css`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  html,
  body,
  .cover-full-screen {
    height: 100vh;
    width: 100vw;
    inset: 0 0;
    padding: 0;
    margin: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  button {
    border: 0;
    background-color: ${blue};
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const indexStyles = css`
  background: url('bluejay_desktop_background1.webp') no-repeat left top;
  background-size: cover;
  > div {
    position: absolute;
    inset: ${scale[10]}px 0 0 ${scale[17]}px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${scale[27]}px;
    height: ${scale[27] * 0.452 + scale[24]}px;

    img {
      width: 100%;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: ${scale[25]}px;
      height: ${scale[24]}px;
      border-radius: ${scale[6]}px;
      background-color: white;
      h1 {
        font-size: ${scale[11]};
        margin-top: ${scale[8]}px;
        margin-bottom: ${scale[6]}px;
      }
      label {
        font-size: ${scale[8]};
        margin-top: ${scale[5]}px;
      }
      input {
        width: ${scale[22]}px;
        height: ${scale[10]}px;
        font-size: ${scale[8]};
        margin-top: ${scale[5]}px;
      }
      button {
        margin-top: ${scale[10]}px;
        width: ${scale[22]}px;
        height: ${scale[12]}px;
        font-size: ${scale[8]};
      }
    }
  }
`;

export const layoutStyles = (screenHeight: number) => css`
  width: ${scale[18]}px;
  background-color: ${darkGray};
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${blue};
    width: ${(scale[16] * screenHeight) / 1024}px;
    height: ${(scale[16] * screenHeight) / 1024}px;
    border-radius: 100%;
    margin-top: ${(scale[7] * screenHeight) / 1024}px;
    img {
      height: ${(scale[16] * screenHeight) / 1024}px;
      margin-right: ${scale[5]};
    }
  }
  button {
    height: ${(scale[14] * screenHeight) / 1024}px;
    height: ${(scale[14] * screenHeight) / 1024}px;
    margin-top: ${(scale[8] * screenHeight) / 1024}px;
    margin-right: ${scale[5]};
    background-color: transparent;

    img {
      height: 100%;
    }
  }
  .ticket-filter-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: ${(scale[26] * screenHeight) / 1024}px;
    width: ${scale[16]}px;
    background-color: ${middleGray};
    margin-top: ${(scale[6] * screenHeight) / 1024}px;

    p {
      font-size: ${scale[8]}px;
      font-weight: bold;
      margin: ${(scale[9] * screenHeight) / 1024}px 0
        ${(scale[4] * screenHeight) / 1024}px 0;
    }
    button {
      width: ${(scale[14] * screenHeight) / 1024}px;
      height: ${(scale[14] * screenHeight) / 1024}px;
      margin-top: ${(scale[6] * screenHeight) / 1024}px;
      background-color: transparent;

      :first-of-type(1) {
        width: ${(scale[14] * screenHeight) / 1024}px;
        margin-left: ${(scale[3] * screenHeight) / 1024}px;
      }
      :nth-of-type(2) {
        width: ${(scale[16] * screenHeight) / 1024}px;
        margin: ${(scale[3] * screenHeight) / 1024}px 0
          ${(scale[6] * screenHeight) / 1024}px
          ${(scale[5] * screenHeight) / 1024}px;
      }
      :last-of-type {
        margin-top: ${(scale[12] * screenHeight) / 1024}px;
      }

      img {
        width: 100%;
        height: auto;
      }
    }

    > img {
      width: ${(scale[14] * screenHeight) / 1024}px;
      margin-top: ${(scale[6] * screenHeight) / 1024}px;
    }
  }
  > img {
    height: ${(scale[14] * screenHeight) / 1024}px;
    margin-top: ${(scale[8] * screenHeight) / 1024}px;
  }
`;

export const allTicketsStyles = (screenWidth: number) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  inset: 0 0 0 ${scale[18]}px;
  width: calc(100vw - ${scale[18]}px);
  height: 100vh;

  .top-bar {
    display: flex;
    align-items: center;
    background-color: black;
    width: 100%;
    min-width: ${scale[27]}px;
    height: ${scale[14]}px;
    > p {
      margin-left: ${(scale[11] * screenWidth) / 1440}px;
      font-size: ${scale[9]}px;
      font-weight: bold;
    }
    button {
      margin-left: ${(scale[7] * screenWidth) / 1440}px;
      height: ${scale[10]}px;
      background-color: transparent;
      img {
        height: 100%;
      }
    }
  }
  .tile-area {
    width: 100%;
    min-width: ${scale[27]}px;
    height: calc(100vh - ${scale[14]}px);
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      margin-left: ${scale[8] * 2}px;
      margin-top: ${scale[9]}px;
    }
  }
`;

// inside .top-bar

export const selectCategoryStyles = (screenWidth: number) => css`
  width: ${(scale[24] * screenWidth) / 1440}px;
  min-width: ${scale[18]}px;

  height: ${scale[10]}px;
  background-color: white;
  margin-left: ${scale[11]}px;
  display: flex;
  align-items: center;

  > div {
    width: ${scale[10]}px;
    height: ${scale[10]}px;
    background-color: ${middleGray};
    display: flex;
    justify-content: center;
    align-items: center;
    .triangle {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: ${scale[8]}px ${scale[9] / 2}px 0 ${scale[9] / 2}px;
      border-color: #000000 transparent transparent transparent;
    }
  }
  p {
    font-size: ${scale[7]};
    font-weight: bold;
    margin-left: ${scale[6]}px;
  }
`;

// inside .top-bar

export const searchBarStyles = (screenWidth: number) => css`
  width: ${(scale[27] * screenWidth) / 1440}px;
  min-width: ${scale[25]}px;
  max-width: ${scale[27]}px;
  height: ${scale[10]}px;
  background: white url('search-icon.png') no-repeat
    ${(scale[6] * screenWidth) / 1440}px;
  background-size: contain;
  border-radius: ${scale[6]}px;
  border: 0;
  margin-left: ${(scale[11] * screenWidth) / 1440}px;
  text-indent: ${scale[13]}px;
  font-size: ${scale[7]};
  font-weight: bold;
  &::placeholder {
    color: gray;
    font-style: italic;
    font-weight: bold;
  }
`;

// inside tile-area

export const tileStyles = (screenWidth: number) => css`
  background-color: ${blue};
  width: ${(scale[30] * screenWidth) / 1440}px;
  min-width: ${scale[29]}px;
  max-width: ${scale[30]}px;
  height: ${scale[18]}px;
  border-radius: ${scale[6]}px;
  margin-top: ${scale[9]}px;
  margin-left: ${scale[8]}px;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  color: black; // must specify bc it is a button now (which are white)

  .rectangular-box {
    height: ${scale[17]}px;
    width: ${((scale[30] - scale[13]) * screenWidth) / 1440}px;
    min-width: ${scale[29] - scale[13]}px;
    max-width: ${scale[30] - scale[13]}px;
    margin-left: ${scale[8]}px;
    background-color: white;
    display: grid;
    grid-template-columns: 16% 15% 12% 10% 9% 16% 22%;
    grid-template-rows: 50% 50%;

    > div {
      border-right: dotted 2px black;
      background-color: ${lightGray};
      display: flex;
      flex-direction: column;

      p {
        font-weight: bold;
        font-size: ${scale[7]}px;
        margin-top: ${scale[4]}px;
        margin-left: ${scale[4]}px;
        span {
          font-size: ${scale[6]}px;
        }
      }
    }

    .status-box {
      grid-row: 1/2;
      grid-column: 1/2;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 0;
      background-color: #fff8b6;
      p {
        font-size: ${scale[9]}px;
        margin-top: 0;
      }
    }

    .title-box {
      grid-row: 1/2;
      grid-column: 2/8;
      border-right: 0;
      background-color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      p {
        font-size: ${scale[10]}px;
        margin: 0 0 0 ${scale[6]}px;
        font-weight: normal;
      }
    }
    .ticket-number-box {
      grid-row: 2/3;
      grid-column: 1/2;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: ${scale[8]}px;
        margin-top: 0;
      }
    }
    .last-response-box {
      grid-row: 2/3;
      grid-column: 2/3;
      p {
        &:first-of-type {
          font-size: ${scale[6]}px;
        }
      }
    }
    .customer-id-box {
      grid-row: 2/3;
      grid-column: 3/4;
      p {
        &:first-of-type {
          font-size: ${scale[6]}px;
        }
      }
    }
    .category-box {
      grid-row: 2/3;
      grid-column: 4/5;
      p {
        &:first-of-type {
          font-size: ${scale[6]}px;
        }
      }
    }
    .priority-box {
      grid-row: 2/3;
      grid-column: 5/6;
      p {
        &:first-of-type {
          font-size: ${scale[6]}px;
        }
      }
    }
    .created-box {
      grid-row: 2/3;
      grid-column: 6/7;
      p {
        &:first-of-type {
          font-size: ${scale[6]}px;
        }
      }
    }
    .assigned-box {
      grid-row: 2/3;
      grid-column: 7/8;
      display: flex;
      flex-direction: row;
      border: 0;
      p {
        &:first-of-type {
          font-size: ${scale[6]}px;
        }
      }
      img {
        margin-left: ${scale[6]}px;
      }
      .assigned-date-box {
        p {
          font-size: ${scale[6]}px;
          margin-left: ${scale[6]}px;
        }
      }
    }
  }
`;

export const messagePanelStyles = css`
  position: absolute;
  right: 16px; // place for scroll-bar??
  top: ${scale[14]}px;
  width: ${scale[28]}px;
  height: fit-content;
  /* background-color: pink; */
  z-index: 3;
  background-color: rgba(255, 255, 255, 90%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: ${scale[6]}px;

  > button {
    position: absolute;
    left: ${scale[5]}px;
    top: ${scale[6]}px;
    width: ${scale[10]}px;
    height: ${scale[10]}px;
    align-self: flex-start;
    background-color: ${red};
    &:hover {
      border: ${scale[3]}px solid black;
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .blue-square {
    position: relative;
    width: ${scale[27] + scale[15]}px;
    height: calc(100vh - 68px - 12px);
    background-color: ${blue};
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    padding-top: ${scale[8]}px;

    .title-bar {
      margin-top: ${scale[5]}px;
      border: solid black 1px;
      width: ${scale[27]}px;
      height: ${scale[14]}px;
      background-color: white;
      font-size: ${scale[10]}px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .reply-container {
      width: ${scale[27]}px;
      height: ${scale[20]}px;
      /* background-color: ${blue}; */
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: ${scale[9]}px;
      margin-bottom: ${scale[9]}px;
      flex-shrink: 0;
      background-color: black;
      .reply-header {
        width: 100%;
        height: ${scale[20] - scale[18]}px;
        display: flex;
        grid-gap: ${scale[9]}px;
        background-color: black;
        padding: ${scale[4]}px;
        .refresh-button {
          margin-left: ${scale[5]}px;
          padding: ${scale[4]}px;
          width: ${scale[11]}px;
          background-color: black;
          img {
            width: 100%;
          }
        }
        .send-button {
          width: ${scale[18]}px;
          background-color: ${green};
          font-size: ${scale[7]}px;
          color: black;
          font-weight: bold;
        }

        .close-button {
          width: ${scale[18]}px;
          background-color: ${orange};
          font-size: ${scale[7]}px;
          color: black;
          font-weight: bold;
        }
        .delete-button {
          width: ${scale[18]}px;
          background-color: ${red};
          margin-left: auto;
          font-size: ${scale[7]}px;
          color: black;
          font-weight: bold;
        }
      }

      textarea {
        width: 100%;
        height: ${scale[18]}px;
        font-size: ${scale[8]}px;
        padding: ${scale[6]}px;
        margin-top: ${scale[4]}px;
      }
    }
  }
`;

export const messageFieldStyles = css`
  height: ${scale[20]}px; // max value
  max-height: ${scale[20]}px;
  width: ${scale[27]}px;
  display: flex;
  margin-top: ${scale[5]}px;
  flex-shrink: 0;

  .info-field {
    width: ${scale[27] - scale[26]}px;
    height: ${scale[16]}px;
    align-self: center;
    background-color: ${orange};
    padding: ${scale[4]}px;
    > p {
      font-weight: bold;
    }
  }
  .message-display-field {
    width: ${scale[26]}px;
    background-color: white;
    border: solid black 1px;
    padding: ${scale[6]}px;
    font-size: ${scale[7]}px;
  }
`;

export const headerBarStyles = css`
  width: ${scale[27]}px;
  height: ${scale[15]}px;
  background-color: ${middleGray};
  margin-top: ${scale[6]}px;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  > div {
    border-right: dotted 2px black;
    background-color: ${lightGray};
    display: flex;
    flex-direction: column;

    p {
      font-size: ${scale[7]}px;
      margin-top: ${scale[4]}px;
      margin-left: ${scale[6]}px;
      font-weight: bold;
      span {
        font-size: ${scale[6]}px;
      }
      &:first-of-type {
        margin-top: ${scale[7]}px;
      }
    }
  }

  .status-square {
    width: ${scale[27] - scale[26]}px;
    height: 100%;
    background-color: ${orange};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    p {
      margin: 0 0 ${scale[6]}px 0;
    }
  }
  .customer-id-square {
    width: 20%;
    height: 100%;
    p {
      &:first-of-type {
        font-size: ${scale[6]}px;
      }
    }
  }
  .priority-square {
    width: 20%;
    height: 100%;
    p {
      &:first-of-type {
        font-size: ${scale[6]}px;
      }
    }
  }
  .category-square {
    width: 20%;
    height: 100%;
    p {
      &:first-of-type {
        font-size: ${scale[6]}px;
      }
    }
  }
  .assigned-square {
    height: 100%;
    flex: 1; // takes all available space
    border: 0;
    p {
      &:first-of-type {
        font-size: ${scale[6]}px;
      }
    }
  }
`;

export const dataStyles = (screenWidth: number) => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  inset: 0 0 0 ${scale[18]}px;
  width: calc(100vw - ${scale[18]}px);
  height: 100vh;
  background-color: ${lightGray};
  /* overflow-y: scroll; */

  .top-bar {
    display: flex;
    align-items: center;
    background-color: black;
    width: 100%;
    min-width: ${scale[27]}px;
    height: ${scale[14]}px;
    flex-shrink: 0;
    > p {
      margin-left: ${(scale[11] * screenWidth) / 1440}px;
      font-size: ${scale[9]}px;
      font-weight: bold;
    }
    button {
      margin-left: ${(scale[7] * screenWidth) / 1440}px;
      height: ${scale[10]}px;
      background-color: transparent;
      img {
        height: 100%;
      }
    }
  }
  > div {
    overflow-y: scroll;
    h1 {
      font-size: ${scale[10]}px;
      font-weight: bold;
      margin-top: ${scale[11]}px;
      margin-left: ${scale[11]}px;
    }
  }
`;

export const chooseDateBarStyles = css`
  width: ${scale[27]}px;
  height: ${scale[12]}px;
  background-color: white;
  margin-top: ${scale[9]}px;
  margin-left: ${scale[11]}px;
  border-radius: ${scale[5]}px;
  display: flex;
  align-items: center;
  .choose-all-button {
    width: ${scale[18]}px;
    height: ${scale[10]}px;
    border: solid black ${scale[1]}px;
    font-size: ${scale[8]}px;
    font-weight: bold;
    background-color: white;
    border-radius: ${scale[5]}px;
    color: black;
    margin-left: ${scale[8]}px;
  }
  .calendar-button {
    width: ${scale[10]}px;
    height: ${scale[10]}px;
    background-color: white;
    margin-left: ${scale[15]}px;

    img {
      width: 100%;
    }
  }
  .date-display-button {
    height: ${scale[10]}px;
    width: ${scale[24]}px;
    border: solid black ${scale[1]}px;
    font-size: ${scale[9]}px;
    font-weight: bold;
    background-color: white;
    color: black;
    border-radius: ${scale[5]}px;
    margin-left: ${scale[7]}px;
  }
`;

export const ticketReportStyles = css`
  background-color: white;
  margin-left: ${scale[15]}px;
  margin-top: ${scale[11]}px;
  width: ${scale[30] - scale[13]}px;
  height: ${scale[28] - scale[15]}px;
  border-radius: ${scale[5]}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: ${scale[29]}px;
    background-color: ${lightGray};
    margin-top: ${scale[11]}px;
    border-radius: ${scale[5]}px;
  }
  .ticket-numbers-box {
    height: ${scale[18]}px;
    display: flex;
    align-items: center;

    > div {
      width: ${scale[20]}px;
      height: ${scale[16]}px;
      border-right: solid black ${scale[1]}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      &:nth-of-type(2) {
        margin-left: auto;
      }
      &:last-of-type {
        border: 0;
      }
      p {
        font-size: ${scale[8]}px;
        font-weight: bold;
        &:nth-of-type(2) {
          font-size: ${scale[12]}px;
        }
      }
    }
  }
  .ticket-charts-box {
    height: ${scale[21]}px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .ticket-timeline-box {
    height: ${scale[21]}px;
    display: flex;
    flex-direction: column;
    > p {
      font-weight: bold;
      font-size: ${scale[7]}px;
      margin-top: ${scale[6]}px;
      margin-left: ${(scale[29] - 3 * scale[23]) / 6}px;
    }
    .timeline-graph-box {
      margin-left: ${(scale[29] - 3 * scale[23]) / 6}px;
      width: ${scale[29] - (scale[29] - 3 * scale[23]) / 3}px;
      height: ${scale[19]}px;
      background: white;
      background-size: contain;
      border-radius: ${scale[5]}px;
      margin-top: ${scale[6]}px;
      display: flex;
      align-items: center;
      .scale-box {
        height: ${scale[8] * 6}px;
        width: ${scale[11]}px;
        margin-right: ${scale[6]}px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        padding-top: ${scale[5]}px;
        grid-gap: 2.7px;
      }

      .fake-line-container {
        position: relative;
        /* width: ${scale[30]}px; */
        width: ${scale[28] + scale[16]}px;
        overflow-x: scroll;

        .fake-line {
          height: ${scale[8]}px;
          /* width: ${scale[29]}px; */
          border-bottom: solid ${lightGray} ${scale[2]}px;
        }
        .penultimate {
          border-bottom: solid black ${scale[1]}px;
        }
        .last {
          border-bottom: 0;
        }
      }
      .column-container {
        position: absolute;
        bottom: ${scale[8]}px;

        height: ${scale[8] * 5}px;
        width: ${scale[29]}px;
        display: flex;
        align-items: flex-end;
        .column {
          height: ${scale[8]}px;
          width: ${scale[10]}px;
          background-color: ${blue};
          margin-right: ${scale[8]}px;
        }
      }
      .date-container {
        position: absolute;
        bottom: 0;
        height: ${scale[8]}px;
        width: ${scale[29]}px;
        /* background-color: yellow; */
        display: flex;
        align-items: flex-end;
        .date {
          width: ${scale[10]}px;
          min-width: ${scale[10]}px;
          max-width: ${scale[10]}px;
          font-size: ${scale[6]}px;
          font-weight: bold;
          margin-right: ${scale[8]}px;
          margin-bottom: 2px;
        }
      }
    }
  }
`;

export const pieChartContainerStyles = css`
  width: ${scale[23]}px;
  height: ${scale[20]}px;
  > p {
    font-size: ${scale[7]}px;
    font-weight: bold;
  }
  .pie-chart-and-legend-container {
    width: ${scale[23]}px;
    height: ${scale[19]}px;
    background-color: white;
    border-radius: ${scale[5]}px;
    display: flex;
    align-items: center;
    margin-top: ${scale[5]}px;
    background-color: creme;
    .pie-chart-wrapper {
      width: ${scale[18]}px;
      margin-left: ${scale[6]}px;
    }
    .legend-wrapper {
      display: flex;
      flex-direction: column;
      margin-left: ${scale[10]}px;
      .legend-item-box {
        display: flex;
        align-items: center;
        margin-top: ${scale[4]}px;
        .legend-color-box {
          width: ${scale[7]}px;
          height: ${scale[7]}px;
          background-color: black;
          border: solid ${middleGray} 1px;
        }
        p {
          font-size: ${scale[7]}px;
          margin-left: ${scale[4]}px;
        }
      }
    }
  }
`;
/* const scale = {
  1: 1,
  2: 2,
  3: 4,
  4: 6,
  5: 8,
  6: 12,
  7: 16,
  8: 20,
  9: 26,
  10: 32,
  11: 40,
  12: 48,
  13: 56,
  14: 68,
  15: 80,
  16: 92,
  17: 108,
  18: 124,
  19: 148,
  20: 172,
  21: 204,
  22: 236,
  23: 284,
  24: 332,
  25: 400,
  26: 512,
  27: 624,
  28: 800,
  29: 1024,
  30: 1248,
}; */
