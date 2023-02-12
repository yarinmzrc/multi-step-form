import { useState } from "react";
import "./Toggle.scss";
export const Toggle = ({
  savedActiveState,
}: {
  savedActiveState?: boolean;
}) => {
  const [isActive, setIsActive] = useState(savedActiveState ?? false);
  return (
    <div
      onClick={() => setIsActive((prev) => !prev)}
      className="toggle-container"
    >
      <div className={`circle ${isActive ? "active" : ""}`}></div>
    </div>
  );
};
