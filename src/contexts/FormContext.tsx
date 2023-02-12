import React, {
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export enum Plan {
  arcade = "Arcade",
  advanced = "Advanced",
  pro = "Pro",
}

export const EAddons = {
  onlineService: "Online Service",
  largerStorage: "Larger Storage",
  customizedProfile: "Customized Profile",
};

export const planPrices = {
  Arcade: { monthly: 9, yearly: 90 },
  Advanced: { monthly: 12, yearly: 120 },
  Pro: { monthly: 15, yearly: 150 },
};

export const addonsPrices = {
  onlineService: { monthly: 1, yearly: 10 },
  largerStorage: { monthly: 2, yearly: 20 },
  customizedProfile: { monthly: 2, yearly: 20 },
};

type TAddons = {
  onlineService: boolean;
  largerStorage: boolean;
  customizedProfile: boolean;
};

type TAddonsPrices = {
  onlineService?: number;
  largerStorage?: number;
  customizedProfile?: number;
};

interface TErrorMessages {
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IFormInfo {
  isMonthly: boolean;
  name: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  plan: Plan;
  addons: TAddons;
  errorMessages: TErrorMessages;
}

export interface IFormContext {
  formInfo: IFormInfo;
  step: number;
  handleSetStep(whereToGo: string): void;
  handleSetPersonalInfo(e: FormEvent<HTMLInputElement>): void;
  toggleIsMonthly(): void;
  setPlan(plan: Plan): void;
  getBackToPlanStep(): void;
  activePlanIndex: number;
  planPrice: number;
  handleClickOnAddon(item: string): void;
  addonsPricesToShow: TAddonsPrices;
}

const defaultValue = {
  isMonthly: true,
  name: "",
  email: "",
  phoneNumber: "",
  plan: Plan.arcade,
  totalPrice: planPrices.Arcade.monthly,
  addons: {
    onlineService: false,
    largerStorage: false,
    customizedProfile: false,
  },
  errorMessages: {
    email: "",
    name: "",
    phoneNumber: "",
  },
};

const FormContext = React.createContext<IFormContext | null>(null);

export function useForm() {
  return useContext(FormContext);
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [formInfo, setFormInfo] = useState(defaultValue);
  const [addonsPricesToShow, setAddonsPricesToShow] = useState<TAddonsPrices>(
    {}
  );
  const [step, setStep] = useState(1);

  const calculateAddonsPrices = (newAddons: TAddons) => {
    const { isMonthly } = formInfo;
    let addonsWithPrices: TAddonsPrices = {};
    Object.entries(newAddons).map(([key, val]) => {
      if (val) {
        if (isMonthly) {
          addonsWithPrices[key as keyof typeof addonsWithPrices] =
            addonsPrices[key as keyof typeof addonsPrices].monthly;
        } else {
          addonsWithPrices[key as keyof typeof addonsWithPrices] =
            addonsPrices[key as keyof typeof addonsPrices].yearly;
        }
      }
    });

    return addonsWithPrices;
  };

  const sumAddonsPrices = () => {
    const { isMonthly, addons } = formInfo;
    return Object.entries(addons).reduce((prev, [key, val]) => {
      if (val) {
        if (isMonthly) {
          return prev + addonsPrices[key as keyof typeof addonsPrices].monthly;
        } else {
          return prev + addonsPrices[key as keyof typeof addonsPrices].yearly;
        }
      }
      return prev;
    }, 0);
  };

  const updateAddonsPrices = (addons: TAddons) => {
    const newAddonsPrices = calculateAddonsPrices(addons);
    setAddonsPricesToShow(newAddonsPrices);
  };

  const handleErrorMessages = () => {
    let newErrorMessages = { ...formInfo.errorMessages };
    if (!formInfo.email) {
      newErrorMessages.email = "This field is required";
      setFormInfo((prev) => ({ ...prev, errorMessages: newErrorMessages }));
    }
    if (!formInfo.name) {
      newErrorMessages.name = "This field is required";
      setFormInfo((prev) => ({ ...prev, errorMessages: newErrorMessages }));
    }
    if (!formInfo.phoneNumber) {
      newErrorMessages.phoneNumber = "This field is required";
      setFormInfo((prev) => ({ ...prev, errorMessages: newErrorMessages }));
    }
  };

  const handleSetStep = (whereToGo: string) => {
    if (whereToGo === "forward") {
      if (step === 1) {
        handleErrorMessages();
        if (!formInfo.email || !formInfo.name || !formInfo.phoneNumber) return;
      }
      setStep((prev) => prev + 1);
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const getBackToPlanStep = () => {
    setStep(2);
  };

  const handleSetPersonalInfo = (e: FormEvent<HTMLInputElement>) => {
    const field = (e.target as HTMLInputElement).id;
    let newErrorMessages = { ...formInfo.errorMessages };
    newErrorMessages[field as keyof typeof newErrorMessages] = "";
    setFormInfo({
      ...formInfo,
      [(e.target as HTMLInputElement).id]: (e.target as HTMLInputElement).value,
      errorMessages: newErrorMessages,
    });
  };

  const toggleIsMonthly = () => {
    setFormInfo((prev) => ({ ...prev, isMonthly: !prev.isMonthly }));
  };

  const planPrice = formInfo.isMonthly
    ? planPrices[formInfo.plan].monthly
    : planPrices[formInfo.plan].yearly;

  const setPlan = (plan: Plan) => {
    const totalPriceFromAddons = sumAddonsPrices();
    const totalPrice = planPrice + totalPriceFromAddons;
    setFormInfo((prev) => ({ ...prev, plan, totalPrice }));
  };

  const handleClickOnAddon = (item: string) => {
    const newAddons = { ...formInfo.addons };
    if (formInfo.addons[item as keyof typeof formInfo.addons]) {
      newAddons[item as keyof typeof formInfo.addons] = false;
    } else {
      newAddons[item as keyof typeof formInfo.addons] = true;
    }
    setFormInfo((prev) => ({ ...prev, addons: newAddons }));
    updateAddonsPrices(newAddons);
  };

  const activePlanIndex =
    formInfo.plan === Plan.arcade ? 0 : formInfo.plan === Plan.advanced ? 1 : 2;

  useEffect(() => {
    const totalPriceFromAddons = sumAddonsPrices();
    const totalPrice = planPrice + totalPriceFromAddons;
    setFormInfo((prev) => ({ ...prev, totalPrice }));
    updateAddonsPrices(formInfo.addons);
  }, [formInfo.isMonthly, formInfo.addons, formInfo.plan]);

  const formContextValue = {
    formInfo,
    step,
    addonsPricesToShow,
    handleSetStep,
    handleSetPersonalInfo,
    toggleIsMonthly,
    setPlan,
    handleClickOnAddon,
    getBackToPlanStep,
    planPrice,
    activePlanIndex,
  };

  return (
    <FormContext.Provider value={formContextValue}>
      {children}
    </FormContext.Provider>
  );
}
