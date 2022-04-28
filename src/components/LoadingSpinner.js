import React from 'react';
import { css } from '@emotion/react';
import SyncLoader from 'react-spinners/SyncLoader';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoadingSpinner = () => {
  return (
    <div className="mx-auto  w-full flex justify-center">
      <SyncLoader
        css={override}
        color="#36D7B7"
        speedMultiplier={0.8}
      />
    </div>
  );
};
export default LoadingSpinner;
