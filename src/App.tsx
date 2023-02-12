import { useState } from "react";
import "./App.scss";
import { Addons } from "./components/Addons/Addons";
import { FormContainer } from "./components/FormContainer/FormContainer";
import { Navigation } from "./components/Navigation/Navigation";
import { PersonalInfo } from "./components/PersonalInfo/PersonalInfo";
import { SelectPlan } from "./components/SelectPlan/SelectPlan";
import { Summary } from "./components/Summary/Summary";
import { ThankYou } from "./components/ThankYou/ThankYou";
import { IFormContext, useForm } from "./contexts/FormContext";
import { useWindowWide } from "./hooks/useWindow";

function App() {
  const { step } = useForm() as IFormContext;
  const windowSize = useWindowWide();

  const formStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <SelectPlan />;
      case 3:
        return <Addons />;
      case 4:
        return <Summary />;
      case 5:
        return <ThankYou />;
      default:
        return;
    }
  };

  return (
    <div className="app">
      {!windowSize && <Navigation idx={step - 1} />}
      <FormContainer idx={step - 1}>{formStep()}</FormContainer>
    </div>
  );
}

export default App;
