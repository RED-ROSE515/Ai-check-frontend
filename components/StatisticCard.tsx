import React from "react";
import Card from "./Card";

const StatisticCard = ({}) => {
  return (
    <React.Fragment>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
        <Card
          backgroundColor="#DBF0C4"
          outlineColor="#B7DA8E"
          title="Total Papers"
          count={0}
        />
        <Card
          backgroundColor="#96ECEC"
          outlineColor="#A0DDDB"
          title="Math Errors"
          count={0}
          percent={1.9}
        />
        <Card
          backgroundColor="#D9E9EE"
          outlineColor="#A1B8E0"
          title="Discrepancies"
          count={0}
          percent={4.5}
        />
        <Card
          backgroundColor="#D6EEEE"
          outlineColor="#9DE2E2"
          title="Methodology Errors"
          count={0}
          percent={1.1}
        />
        <Card
          backgroundColor="#D2EEB7"
          outlineColor="#62A610"
          title="Interpretation Errors"
          count={0}
          percent={0.5}
        />
        <Card
          backgroundColor="#D4F2E0"
          outlineColor="#9FDCBC"
          title="Writing Errors"
          count={0}
          percent={10.4}
        />
      </div>
    </React.Fragment>
  );
};
export default StatisticCard;
