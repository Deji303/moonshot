const http = require('http')
const fs = require('fs')

function send404Response (response) {
  response.writeHead(404, { 'Content-Type': 'text/plain' })
  response.write('Error 404: Page not found')
  response.end()
}

function onRequest (request, response) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Max-Age': 2592000, // 30 days
    'Access-Control-Allow-Headers': 'content-type'
    /** add other headers as per requirement */
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers)
    response.end()
    return
  }

  if (request.method == 'POST' && request.url == '/cards') {
    response.writeHead(200, headers)

    let body = ''
    request.on('data', chunk => {
        body += chunk
      fs.writeFile('cards.json', body, 'utf8', err => {
        if (err) throw err
        console.log('Data written to file')
        let test = fs.readFileSync('cards.json')
        console.log(JSON.parse(test))

      })
    })
    // request.on('end', () => {
    //   response.end('ok')
    // })

    // const data = JSON.stringify(request)
    // console.log(body.toString())

    // fs.writeFile('cards.json', body, err => {
    //   if (err) throw err
    //   console.log('Data written to file')
    // //   let newData = JSON.parse(rawdata)
    // //   console.log(newData)
    // })
  }

  // //   console.log('A user made a request' + request.url)
  //   response.writeHead(200, { 'Content-Type': 'text/plain' })
  //   response.write('Here is your response')
  //   response.end()
}

http.createServer(onRequest).listen(3000)
console.log('Server is listening...')
