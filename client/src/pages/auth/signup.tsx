import { type NextPage } from "next";
import Head from "next/head";
import { SignUpForm } from "~/components";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta
          name="description"
          content="Buy your event tickets with few clicks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-white">
        <div className="container mx-auto h-full">
          <SignUpForm />
        </div>
      </main>
    </>
  );
};

export default SignUp;
