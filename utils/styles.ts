import { css } from '@emotion/react';

const blue = '#2799E0';

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
    background: url('bluejay_desktop_background1.webp') no-repeat left top;
    background-size: cover;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  button {
    border: 0;
    background-color: ${blue};
    color: white;
  }
`;

export const indexStyles = css`
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
