import { IFormContext, useForm } from "../../contexts/FormContext";
import { FormContent } from "../FormContent/FormContent";
import "./PersonalInfo.scss";

export const PersonalInfo = () => {
  const { handleSetPersonalInfo, formInfo } = useForm() as IFormContext;
  const { errorMessages } = formInfo;
  return (
    <div className="personal-info-container">
      <FormContent
        contentTitle="Personal Info"
        contentSubtitle="Please provide your name, email adress, and phone number"
      >
        <div className="label-container">
          <label className="label" htmlFor="name">
            Name
          </label>
          <strong className="error-message">{errorMessages.name}</strong>
        </div>
        <input
          id="name"
          type="text"
          placeholder="e.g Stephan King"
          value={formInfo.name}
          className={`input ${errorMessages.name ? "error" : ""}`}
          onChange={handleSetPersonalInfo}
        />
        <div className="label-container">
          <label className="label" htmlFor="name">
            Email Address
          </label>
          <strong className="error-message">{errorMessages.email}</strong>
        </div>
        <input
          id="email"
          type="email"
          value={formInfo.email}
          placeholder="e.g stephanking@lorem.com"
          className={`input ${errorMessages.email ? "error" : ""}`}
          onChange={handleSetPersonalInfo}
        />
        <div className="label-container">
          <label className="label" htmlFor="name">
            Phone Number
          </label>
          <strong className="error-message">{errorMessages.phoneNumber}</strong>
        </div>
        <input
          id="phoneNumber"
          type="number"
          value={formInfo.phoneNumber}
          placeholder="e.g +1 234 567 890"
          className={`input ${errorMessages.phoneNumber ? "error" : ""}`}
          onChange={handleSetPersonalInfo}
        />
      </FormContent>
    </div>
  );
};
