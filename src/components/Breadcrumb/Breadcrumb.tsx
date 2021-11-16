import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = ({ ...props }) => {
  return (
    <>
      <div {...props}></div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            {props.productName ? <Link to="/">Home</Link> : null}
          </li>
          {props.productName ? (
            <li className="breadcrumb-item active" aria-current="page">
              {props.productName}
            </li>
          ) : null}
        </ol>
      </nav>
    </>
  );
};

Breadcrumb.propTypes = {
  productName: PropTypes.any,
};

export default Breadcrumb;
