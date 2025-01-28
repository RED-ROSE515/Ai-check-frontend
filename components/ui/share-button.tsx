import React from "react";
import { Button as HeroUIButton } from "@heroui/react"; // Adjust the import based on your HeroUI setup

const ShareButton = React.forwardRef(({ children, ...props }: any, ref) => {
  return (
    <HeroUIButton {...props} ref={ref}>
      {children}
    </HeroUIButton>
  );
});

ShareButton.displayName = "ShareButton";

export default ShareButton;
