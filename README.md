# Augur Reporting Subgraph

### Querying all possible data that is stored in the subgraph
The query below shows all the information that is possible to query, but is limited to the first 5 instances. There are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

There are five high level queries - `market`, `tokens`, `users`. There are entities nested within these queries as well. 

```
{
  // TBD
  markets {}
}

```
The command above can be copy pasted into the Graphiql interface in your browser at `127.0.0.1:8000`.

