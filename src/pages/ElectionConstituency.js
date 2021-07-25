import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Election from "../ethereum/election";
// import web3 from '../ethereum/web3'
import CandidateList from "../components/CandidateList";
// import AddNewCandidate from '../components/AddNewCandidate'
import { Link } from "react-router-dom";
import { Table, Header, Segment, Button } from "semantic-ui-react";

const ElectionConstituency = () => {
  const { address } = useParams();
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const election = Election(address);
      const candidateCount = await election.methods.getCandidateCount().call();
      const temp = await Promise.all(
        Array(parseInt(candidateCount))
          .fill()
          .map((element, index) => {
            return election.methods.candidates(index).call();
          })
      );
      setCandidates(temp);
    }
    fetchData();
  }, [address]);
  const displayCandidate = candidates.map((candidate, index) => {
    return (
      <CandidateList
        key={index}
        candidate={candidate}
        address={address}
        index={index}
      />
    );
  });
  return (
    <div style={{ margin: "auto" }}>
      <Segment
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderRadius: "0",
        }}
      >
        <Header size="huge">Election Constituency</Header>
        <Link to={`/${address}/new`}>
          <Button basic color="orange">
            Fill Nomination
          </Button>
        </Link>
      </Segment>
      <Table celled padded style={{ maxWidth: "65vw", margin: "3vh auto" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              style={{ color: "white", backgroundColor: "#333" }}
              singleLine
            >
              Name
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "white", backgroundColor: "#333" }}
              singleLine
            >
              Election Party
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "white", backgroundColor: "#333" }}
              singleLine
              colSpan="2"
            >
              Description
            </Table.HeaderCell>
            <Table.HeaderCell
              style={{ color: "white", backgroundColor: "#333" }}
              singleLine
            >
              Vote
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{displayCandidate}</Table.Body>
      </Table>
    </div>
  );
};

export default ElectionConstituency;
