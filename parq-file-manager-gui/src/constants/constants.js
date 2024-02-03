const HOSTIP = "localhost";
const HOSTPORT = "5050";
const production = false
let HOST = ""
if(production)  HOST = `/api/`; 
else HOST = `http://${HOSTIP}:${HOSTPORT}/parqfile/`;
 
export {HOST}