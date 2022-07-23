import { css } from "@emotion/css";
import React, { FC } from "react";
import { ModalFooterProps } from "../types";

const ModalFooter: FC<ModalFooterProps> = (props) => {
  const classNames = [];
  classNames.push(css`
    width: 100%;
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 0;
  `);
  if (props.className) classNames.push(props.className);

  return <div className={classNames.join(" ")}>{props.children}</div>;
};

export default ModalFooter;
