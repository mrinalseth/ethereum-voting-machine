import React, { useEffect, useState } from "react";
import web3 from "../ethereum/web3";
import Election from "../ethereum/election";
import { Button, Table, Loader } from "semantic-ui-react";

const CandidateList = ({ candidate, address, index }) => {
  const [hasVoted, sethasVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      const election = Election(address);
      await election.methods.castVote(index).send({
        from: accounts[0],
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const accounts = await web3.eth.getAccounts();
      const election = Election(address);
      sethasVoted(await election.methods.voted(accounts[0]).call());
    }
    fetchData();
  }, [address]);
  return (
    <Table.Row>
      <Table.HeaderCell>{candidate["name"]}</Table.HeaderCell>
      <Table.HeaderCell>{candidate["partyName"]}</Table.HeaderCell>
      <Table.HeaderCell colSpan="2">{candidate["bio"]}</Table.HeaderCell>
      <Table.HeaderCell>
        {hasVoted ? (
          <p>You have already voted</p>
        ) : (
          <Button basic color="orange" onClick={onClick}>
            {loading ? (
              <Loader
                inline
                active
                size="tiny"
                style={{ marginRight: "5px" }}
              />
            ) : null}
            Vote
          </Button>
        )}
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default CandidateList;
