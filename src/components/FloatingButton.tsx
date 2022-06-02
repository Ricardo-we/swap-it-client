import React from "react";

interface FloatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element | string;
  x?: "left" | "right";
  y?: "top" | "bottom";
}

function FloatingButton({ icon, x, y, ...props }: FloatingButtonProps) {
  return (
    <>
      <style>{`
                .floating-button {
                    position: fixed;
                    border-radius: 100%;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    ${x}: 10px;
                    ${y}: 10px;
                    z-index: 700;
                }
            `}</style>
      <button {...props} className={"floating-button  " + props.className}>
        {icon}
      </button>
    </>
  );
}

export default FloatingButton;
