import { createRef } from "react";
import { Container } from "semantic-ui-react";
import Router from "next/router";
import nprogress from "nprogress";
import {
  Container,
  Divider,
  Grid,
  Sticky,
  Visibility,
  Ref,
  Segment,
} from "semantic-ui-react";

import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import Search from "./Search";
import SideBar from "./SideBar";

function Layout({ children, user }) {
  const contextRef = createRef();

  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      {user ? (
        <>
          <div style={{ margin: "0 1rem" }}>
            <Ref innerRef={contextRef}>
              <Grid>
                <Grid.Column floated="left" width={2}>
                  <Sticky context={contextRef}>
                    <SideBar user={user} />
                  </Sticky>
                </Grid.Column>

                <Grid.Column width={10}>
                  <Visibility context={contextRef}>{children}</Visibility>
                </Grid.Column>

                <Grid.Column floated="left" width={4}>
                  <Sticky context={contextRef}>
                    <Segment basic>
                      <Search />
                    </Segment>
                  </Sticky>
                </Grid.Column>
              </Grid>
            </Ref>
          </div>
        </>
      ) : (
        <>
          <HeadTags />
          <Navbar />
          <Container text>{children}</Container>
        </>
      )}
    </>
  );
}

export default Layout;
