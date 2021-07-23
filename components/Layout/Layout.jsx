import { Container } from "semantic-ui-react";

import HeadTags from "./HeadTags";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <HeadTags />
      <Navbar />
      <Container style={{ paddingTop: "1rem" }} text></Container>
    </>
  );
}

export default Layout;
