import { type NextPage } from "next";
import Head from "next/head";
import { SigninForm } from "~/components";

const SignIn: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Buy your event tickets with few clicks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-white">
        <div className="container mx-auto h-full">
          <SigninForm />
        </div>
      </main>
    </>
  );
};

export default SignIn;
