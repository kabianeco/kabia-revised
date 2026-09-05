// Opt-in transport lock for this standalone runner only.
import net from "node:net";
import http from "node:http";
import https from "node:https";
import { syncBuiltinESMExports } from "node:module";
const deny = () => { throw new Error("Database-free suite attempted network access"); };
globalThis.fetch = deny;
net.Socket.prototype.connect = deny;
http.request = http.get = https.request = https.get = deny;
syncBuiltinESMExports();
