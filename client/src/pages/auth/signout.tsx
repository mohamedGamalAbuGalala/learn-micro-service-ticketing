import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useRequest } from "~/hooks";

const Signout: NextPage = () => {
  const router = useRouter();

  const { doRequest } = useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => {
      void router.push("/");
    },
  });

  React.useEffect(() => {
    void doRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Signing out</title>
        <meta
          name="description"
          content="Buy your event tickets with few clicks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-white">
        <div className="container mx-auto h-full">
          <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
            Signing you out...
          </h1>
        </div>
      </main>
    </>
  );
};

export default Signout;
