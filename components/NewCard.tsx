import { Card, CardBody, CardHeader, cn } from "@heroui/react";
const NewCard = ({ children, className, title }: any) => {
  return (
    <Card
      isBlurred
      className={cn("bg-transparent w-full", className)}
      isHoverable
      isPressable
    >
      <CardHeader>
        <strong>{title}</strong>
      </CardHeader>
      <CardBody>
        <div className="relative z-30">{children}</div>
      </CardBody>
    </Card>
  );
};
export default NewCard;
