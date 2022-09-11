import Parse from 'parse/dist/parse.min.js';
Parse.initialize(process.env.NEXT_PUBLIC_PARSE_ID, '')
Parse.serverURL = process.env.NEXT_PUBLIC_PARSE_URL;
const ParseService = Parse;

export default ParseService;