import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  font-family: "Montserrat";
  width: 100%;
`;
const BalanceBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  gap: 120px;
`;
const Add = styled.div`
  background-color: black;
  color: white;
  outline: none;
  border: none;
  padding: 5px 15px;
  border-radius: 5px;
  text-allign: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
`;

const AddTransctionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  // border:none;
  padding: 15px 20px;
  margin: 20px;

  gap: 10px;
  width: 100%;
  & input {
    //  background-color:#a2a2a0;
    outline: none;
    padding: 10px 12px;
    border-radius: 5px;
    border: 1px solid black;
  }
`;
const Radiobox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  & input {
    width: unset;
    margin: 0 10px;
  }
`;
const ExpenseContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 30px;
  margin: 20px;
`;
const Expensebox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 15px 20px;
  width: 135px;
  font-size: 16px;

  & span {
    font-weight: bold;
    color: ${(props) => (props.isIncome ? "green" : "red")};
  }
`;
// ----------------------------------//
const Addveiw = (props) => {
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("EXPENSE");
  const handleAddTransction = () => {
    // Logic to add transaction
    props.addTransction({
      amount: Number(amount),
      description,
      type,
      id: Date.now(),
    });
    props.setAddto("");
  };
  return (
    <AddTransctionContainer>
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Radiobox>
        <input
          type="radio"
          id="expense"
          name="type"
          value="EXPENSE"
          checked={type === "EXPENSE"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="expense">Expense</label>
        <input
          type="radio"
          id="income"
          name="type"
          value="INCOME"
          checked={type === "INCOME"}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="income">Income</label>
      </Radiobox>

      <Add onClick={handleAddTransction}>Add Transction</Add>
    </AddTransctionContainer>
  );
};

const Revie = (props) => {
  const [Addto, setAddto] = useState(false);

  return (
    <Container>
      <BalanceBox>
        Balance: ${props.income - props.expense}
        <Add onClick={() => setAddto(!Addto)}> {Addto ? "Cancel" : "ADD"}</Add>
      </BalanceBox>
      {Addto && (
        <Addveiw setAddto={setAddto} addTransction={props.addTransction} />
      )}
      <ExpenseContainer>
        <Expensebox isIncome={false}>
          Expense
          <span> ${props.expense} </span>
        </Expensebox>
        <Expensebox isIncome={true}>
          Income
          <span> ${props.income} </span>
        </Expensebox>
      </ExpenseContainer>
    </Container>
  );
};

export default Revie;
