import { type NextPage } from "next";
import Head from "next/head";
import { buildClient } from "~/api";

interface Props {
  currentUser: {
    email: string;
    iat: number;
    id: string;
  } | null;
}
const Home: NextPage<Props> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <>
      <Head>
        <title>Ticketing</title>
        <meta
          name="description"
          content="Buy your event tickets with few clicks"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {currentUser ? (
            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
              Hi {currentUser?.email}
            </h1>
          ) : (
            <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
              Welcome
            </h1>
          )}
        </div>
      </main>
    </>
  );
};

Home.getInitialProps = async ({ req }) => {
  const client = buildClient({ req });
  const { data } = (await client.get("/api/users/currentuser")) as unknown as {
    data: Props;
  };

  return data;
};

export default Home;
