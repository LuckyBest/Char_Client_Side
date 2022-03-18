

export type projectUrlsObjectT = {
    development: string,
    production: string,
    test: string,
  }
  
const projectUrlsObject:projectUrlsObjectT = {
    development: `ws://localhost:8900`,
    production: `https://dinauxchatsocket.herokuapp.com:8900`,
    test: ``,
} 

export const SOCKET_URL = projectUrlsObject[process.env.NODE_ENV];