import { ReactNode } from "react";
import { IFormContext, useForm } from "../../contexts/FormContext";
import "./FormContent.scss";

export const FormContent = ({
  contentTitle,
  contentSubtitle,
  hasGoBack,
  children,
}: {
  contentTitle: string;
  contentSubtitle: string;
  hasGoBack?: boolean;
  children: ReactNode;
}) => {
  const { handleSetStep, step } = useForm() as IFormContext;
  return (
    <div className="form-content">
      <h1 className="content-title">{contentTitle}</h1>
      <p className="content-subtitle">{contentSubtitle}</p>
      <div className="children-wrapper">{children}</div>
      {hasGoBack ? (
        <div className="buttons-container">
          <button
            className="goback-button"
            onClick={() => handleSetStep("backwords")}
          >
            Go Back
          </button>
          <button
            className={`button ${step === 4 ? "confirm" : ""}`}
            onClick={() => handleSetStep("forward")}
          >
            {step === 4 ? "Confirm" : "Next Step"}
          </button>
        </div>
      ) : (
        <button className="button" onClick={() => handleSetStep("forward")}>
          Next Step
        </button>
      )}
    </div>
  );
};
