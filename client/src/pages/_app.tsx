import { type AppType } from "next/dist/shared/lib/utils";
import { buildClient } from "~/api";
import { Header } from "~/components";
import "~/styles/globals.css";

declare global {
  type UserResponse = {
    email: string;
    iat: number;
    id: string;
  } | null;
}

interface CurrentUserResponse {
  currentUser: UserResponse;
}

const MyApp: AppType<CurrentUserResponse> = ({ Component, pageProps }) => {
  const currentUser = pageProps?.currentUser;

  return (
    <>
      <Header currentUser={currentUser} />

      <Component {...pageProps} />
    </>
  );
};

MyApp.getInitialProps = async ({ ctx, Component }) => {
  const client = buildClient({ req: ctx.req });
  const { data } = (await client.get("/api/users/currentuser")) as unknown as {
    data: CurrentUserResponse;
  };
  const pageProps = (await Component.getInitialProps?.(ctx)) ?? {};

  return { pageProps, ...data };
};

export default MyApp;
