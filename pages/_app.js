import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import "semantic-ui-css/semantic.min.css";

import Layout from "../components/layout/Layout";
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { token } = parseCookies(ctx);
  const protectedRoutes = ctx.pathname === "/";

  if (!token) protectedRoutes && redirectUser(ctx, "/login");
  else {
    if (component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx);

    try {
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token },
      });
      const { user, userFollowStats } = res.data;

      if (user) !protectedRoutes && redirectUser(ctx, "/");

      pageProps.user = user;
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }

  return { pageProps };
};

export default MyApp;