import { ReactElement } from 'react';
import { Spinner } from 'react-bootstrap';
import './css/loader.css';

function Loader(): ReactElement {
  return (
    <div className="container-loader">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader;