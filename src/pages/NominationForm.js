// import react from 'react'
import { useParams } from "react-router-dom";
import AddNewCandidate from "../components/AddNewCandidate";
import { Segment, Header } from "semantic-ui-react";

const NominationForm = () => {
  const { address } = useParams();
  return (
    <div>
      <Segment
        style={{
          backgroundColor: "#333",
          borderRadius: "0",
          paddingLeft: "15rem",
        }}
      >
        <Header style={{ color: "white" }}>Nomination Form</Header>
      </Segment>
      <AddNewCandidate address={address} />
    </div>
  );
};

export default NominationForm;
