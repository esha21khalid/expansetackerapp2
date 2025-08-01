import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Revie from "./Revie";
import Transction from "./Transction";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0 10px;
  font-family: "Montserrat";
  width: 360px;
`;
const HomeComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  // adding kalia //
  const addTransction = (payload) => {
    const transctionarray = [...transactions];
    transctionarray.push(payload);
    setTransactions(transctionarray);
  };
  // -----balanse ko calculate krba kalia-----//

  const calculateBalance = () => {
    let Expense = 0;
    let Income = 0;
    transactions.map((payload) => {
      payload.type === "EXPENSE"
        ? (Expense += payload.amount)
        : (Income += payload.amount);
    });
    setExpense(Expense);
    setIncome(Income);
  };

  useEffect(() => calculateBalance(), [transactions]);

  return (
    <Container>
      <Revie addTransction={addTransction} expense={expense} income={income} />
      <Transction transactions={transactions} />
    </Container>
  );
};

export default HomeComponent;
