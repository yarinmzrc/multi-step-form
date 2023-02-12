import { ReactNode } from "react";
import { Navigation } from "../Navigation/Navigation";
import "./FormContainer.scss";

export const FormContainer = ({
  children,
  idx = 0,
}: {
  idx: number;
  children: ReactNode;
}) => {
  return (
    <div className="form-wrapper">
      <Navigation idx={idx} />
      <div className="content-wrapper">{children}</div>
    </div>
  );
};
