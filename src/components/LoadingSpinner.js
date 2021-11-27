import { css } from '@emotion/react'
import BarLoader from 'react-spinners/BarLoader'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 200px;
`

export default function LoadingSpinner() {
  return (
    <div className="m-4 align-items-center justify-content-center">
      <div className="my-12">
        <BarLoader color={'#36D7B7'} loading={true} css={override} size={150} />
      </div>
    </div>
  )
}
