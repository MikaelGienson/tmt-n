import "./TestSuites.scss";
import { useState } from "react";
import { ISuites } from "../interfaces/Interfaces";
import TestSuiteCard from "./TestSuiteCard";

const SUITES = [
  {
    title: "Regression",
    description:
      "Very very good, very very good, very very good,  very very good,  very very good,  very very good",
    lastRunDate: "2022/01/23 18:55",
    noOfTestCases: 159,
    author: "Fred Durst"
  },
  {
    title: "Regression",
    description:
      "Very very good, very very good, very very good,  very very good,  very very good,  very very good",
    lastRunDate: "2022/01/23 18:55",
    noOfTestCases: 159,
    author: "Fred Durst"
  },
  {
    title: "Regression",
    description:
      "Very very good, very very good, very very good,  very very good,  very very good,  very very good",
    lastRunDate: "2022/01/23 18:55",
    noOfTestCases: 159,
    author: "Fred Durst"
  },
  {
    title: "Regression",
    description:
      "Very very good, very very good, very very good,  very very good,  very very good,  very very good",
    lastRunDate: "2022/01/23 18:55",
    noOfTestCases: 159,
    author: "Fred Durst"
  },
  {
    title: "Regression",
    description:
      "Very very good, very very good,  very very good,  very very good,  very very good,  very very good",
    lastRunDate: "2022/01/23 18:55",
    noOfTestCases: 159,
    author: "Fred Durst"
  },
  {
    title: "Regression",
    description:
      "Very very good, very very good,  very very good,  very very good,  very very good,  very very good",
    lastRunDate: "2022/01/23 18:55",
    noOfTestCases: 159,
    author: "Fred Durst"
  }
];

export const TestSuites = () => {
  const [suites, setSuites] = useState<ISuites[]>(SUITES);

  return (
    <div className="suites-container">
      {SUITES.map((suite: ISuites) => (
        <TestSuiteCard
          title={suite.title}
          description={suite.description}
          lastRunDate={suite.lastRunDate}
          noOfTestCases={suite.noOfTestCases}
          author={suite.author}
        />
      ))}
    </div>
  );
};
