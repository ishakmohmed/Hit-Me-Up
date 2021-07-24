import { Container } from "semantic-ui-react";
import Router from "next/router";
import nprogress from "nprogress";

import HeadTags from "./HeadTags";
import Navbar from "./Navbar";

function Layout({ children }) {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      <Navbar />
      <Container text style={{ paddingTop: "1rem" }}>
        {children}
      </Container>
    </>
  );
}

export default Layout;