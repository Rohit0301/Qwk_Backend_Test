import {server} from './lib/server';

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})