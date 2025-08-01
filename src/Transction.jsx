import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 30px 0 10px;
  font-weight: bold;
  font-family: "Montserrat";
  width: 360px;
  gap: 10px;
  & input {
    background-color: #f5eeeeff;
    width: 100%;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid black;
    outline: none;
  }
`;
const Cell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 15px;
  align-items: center;
  border: 1px solid rgba(223, 208, 208, 1);
  border-radius: 5px;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const Transctioncell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span> {props.payload.description} </span>
      <span> {props.payload.amount} </span>
    </Cell>
  );
};
const Transction = (props) => {
  const [Search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState(
    props.transactions
  );
  const filterData = () => {
    if (Search || Search.trim().length) {
      setFilteredTransactions(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.description.toLowerCase().includes(Search.toLowerCase().trim())
    );
    setFilteredTransactions(txn);
  };

  useEffect(() => {
    filterData(Search), [props.transactions]; // just call it, no arguments
  });

  return (
    <Container>
      Transction
      <input
        type="text"
        placeholder="Search"
        value={Search}
        onChange={(e) => {
          setSearch(e.target.value);
          filterData(e.target.value);
        }}
      />
      {filteredTransactions?.length
        ? filteredTransactions.map((payload) => (
            <Transctioncell payload={payload} />
          ))
        : ""}
    </Container>
  );
};

export default Transction;
