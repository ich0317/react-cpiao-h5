import React from "react";
import PropTypes from "prop-types";

const SvgIcon = props => {
  const { iconClass, fill, size } = props;

  return (
    <i aria-hidden="true" className="anticon">
      <svg className="bbb" width={size} height={size} >
        <use xlinkHref={"#icon-" + iconClass} fill={fill}/>
      </svg>
    </i>
  );
};

SvgIcon.propTypes = {
  // svg名字
  iconClass: PropTypes.string.isRequired,
  // 填充颜色
  fill: PropTypes.string,
  size: PropTypes.string
};

SvgIcon.defaultProps = {
  fill: "currentColor"
};

export default SvgIcon
