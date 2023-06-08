import axios from "axios";
import { type IncomingMessage } from "http";

export const buildClient = ({ req }: { req?: IncomingMessage }) => {
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req?.headers,
    });
  }

  // We must be on the browser
  return axios.create({
    baseURL: "/",
  });
};
