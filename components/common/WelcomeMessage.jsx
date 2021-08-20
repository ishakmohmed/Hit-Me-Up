import { Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached="bottom">
            Login
            <Link href="/login"> here </Link>
            instead
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached="bottom">
            Sign up<Link href="/signup"> here </Link> instead{" "}
          </Message>
          <Link href="/reset">Forgot password?</Link>
        </>
      )}
    </>
  );
};
