import { Client } from "appwrite";

const client = new Client();

client
    .setEndpoint('http://localhost/v1')
    .setProject('63ea716e5618910d89da');

export default client;