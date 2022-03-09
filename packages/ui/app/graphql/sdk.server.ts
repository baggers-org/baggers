import { getSdk } from "~/generated/graphql";
import { client } from "./GraphQLClient.server";

export const sdk = getSdk(client)