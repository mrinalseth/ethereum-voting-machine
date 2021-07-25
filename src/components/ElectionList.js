import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import web3 from '../ethereum/web3'
import Election from "../ethereum/election";

const ElectionList = (props) => {
  const [name, setName] = useState("");
  const [curAccount, setCurrAccount] = useState('')
  const [winner, setWinner] = useState('')
  useEffect(() => {
    async function fetchData() {
      const accounts = await web3.eth.getAccounts()
      setCurrAccount(accounts[0])
      const election = Election(props.address);
      setName(await election.methods.constituency().call());
    }
    fetchData();
  }, [props.address]);
  const onClick = async () => {
    const election = Election(props.address);
    // setWinner(await election.methods.declareResult().call())
    setWinner(await election.methods.getName().call());
  };
  return (
    <Card style={{ margin: "0" }} >
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>View list of contesting candidates</Card.Meta>
        <Card.Description>
          {winner}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={`/${props.address}`}>
          <Button basic color="green" onClick={onClick}>
            Select
          </Button>
        </Link>
        {props.ec == curAccount
        ?(<Button basic color="orange" onClick={onClick}>
          Result
        </Button>)
        :null}
      </Card.Content>
    </Card>
  );
};
// {props.ec == curAccount?
export default ElectionList;
