import React, { useState, useRef } from "react";
import "./App.css";
import { Box } from "@mui/material";
import Display from "./components/Display";
import InputKey from "./components/InputKey";

function App() {
  const inputKeys = [
    "AC",
    "Del",
    "%",
    "/",
    "7",
    "8",
    "9",
    "X",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const opKeys = ["%", "/", "X", "-", "+"];

  const genKey = ["AC", "Del", "=", "."];

  const [calc, setCalc] = useState({
    num1: 0,
    num2: 0,
    operator: "",
    expression: "",
    result: "",
  });

  const isN1Decimal = useRef(false);
  const isN2Decimal = useRef(false);

  function calculate(n2) {
    let result = 0;
    switch (calc.operator) {
      case "+":
        result = calc.num1 + n2;
        break;
      case "-":
        result = calc.num1 - n2;
        break;
      case "/":
        result = calc.num1 / n2;
        break;
      case "X":
        result = calc.num1 * n2;
        break;
      default:
        console.log(`other operator : ${calc.operator}`);
        break;
    }

    return result;
  }

  function handleDelOp() {
    let n1 = 0;
    let n2 = 0;
    if (calc.operator === "") {
      n1 = (calc.num1 / 10) | 0;
      setCalc({
        ...calc,
        num1: n1,
        expression: calc.expression.slice(0, -1),
        result: calc.result.slice(0, -1),
      });
    } else {
      if (calc.num2 !== 0) {
        n2 = (calc.num2 / 10) | 0;
        const result = calculate(n2);
        setCalc({
          ...calc,
          num2: n2,
          expression: calc.expression.slice(0, -1),
          result: `${result}`,
        });
      } else {
        setCalc({
          ...calc,
          operator: "",
          expression: calc.expression.slice(0, -3),
        });
      }
    }
  }

  function handleKeyClick(keyInput) {
    console.log(`${keyInput} Clicked`);
    if (opKeys.includes(keyInput)) {
      console.log("input key is a operator");
      setCalc({
        ...calc,
        operator: keyInput,
        expression: `${calc.num1} ${keyInput}`,
        result: calc.result,
      });
      return;
    } else if (genKey.includes(keyInput)) {
      if (keyInput === "AC") {
        isN1Decimal.current = false;
        isN2Decimal.current = false;
        setCalc({
          ...calc,
          num1: 0,
          num2: 0,
          operator: "",
          expression: "0",
          result: "",
        });
        return;
      } else if (keyInput === ".") {
        if (calc.operator === "") {
          if (isN1Decimal.current) {
            return;
          }
          let n1 = parseFloat(calc.num1 + keyInput + "0");
          isN1Decimal.current = true;
          setCalc({
            ...calc,
            num1: n1,
            expression: `${n1}.`,
            result: `= ${n1}`,
          });
        } else {
          if (isN2Decimal.current) {
            return;
          }
          let n2 = parseFloat(calc.num2 + keyInput + "0");
          isN2Decimal.current = true;
          setCalc({
            ...calc,
            num2: n2,
            expression: `${calc.num1} ${calc.operator} ${n2}.`,
            result: `= ${calculate(n2)}`,
          });
        }
        return;
      } else {
        if (keyInput === "Del") {
          handleDelOp();
        }
        return;
      }
    }

    if (calc.operator === "") {
      let check = isN1Decimal.current ? "." : "";
      let n1 = parseFloat(`${calc.num1}${check}${keyInput}`);
      setCalc({ ...calc, num1: n1, expression: `${n1}`, result: `= ${n1}` });
    } else {
      let check = isN2Decimal.current ? "." : "";
      let n2 = parseFloat(`${calc.num2}${check}${keyInput}`);
      setCalc({
        ...calc,
        num2: n2,
        expression: `${calc.num1} ${calc.operator} ${n2}`,
        result: `${calculate(n2)}`,
      });
    }
  }
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr 5fr",
          height: "80vh",
          width: "40%",
          bgcolor: "#fff",
          mx: "auto",
        }}
      >
        <Display expression={calc.expression} result={calc.result} />
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(5,1fr)",
            gridTemplateColumns: "repeat(4,1fr)",
          }}
        >
          {inputKeys.map((item, idx) => {
            return <InputKey key={idx} onClick={handleKeyClick} value={item} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
