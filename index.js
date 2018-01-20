const CoinHive = require('coin-hive');
const http = require('http');  

(async () => {
 
  // Create miner
  const miner = await CoinHive('U3bK5ioP4A8bsActf7dNSnrkKPI67PpR'); // Coin-Hive's Site Key
 
  // Start miner
  await miner.start();
 
  // Listen on events
  miner.on('found', () => console.log('Found!!'))
  miner.on('accepted', () => console.log('Accepted!!'))
  miner.on('update', data => console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `));
 
  const requestHandler = (request, response) => {  
    console.log(request.url)
    response.end('Running!!')
  }

  const server = http.createServer(requestHandler)

  server.listen(process.env.PORT, (err) => {  
    if (err) {
      return console.log('something bad happened', err)
    }

    console.log(`server is listening`)
  })

  // Stop miner
  //setTimeout(async () => await miner.stop(), 60000);
})();
