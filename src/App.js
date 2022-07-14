import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import NewBookNotification from "./components/NewBookNotification";
import AllBooksQuery from "./components/AllBooksQuery";

//defines websocket link
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
  })
);

//defines http link
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// split requests based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

//defines client
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

//generic welcome message
function Welcome() {
  return <h1>New Book Subscriptions!</h1>;
}

const App = () => (
  <ApolloProvider client={client}>
    <Welcome />
    <AllBooksQuery />
    <NewBookNotification />
  </ApolloProvider>
);

export default App;
