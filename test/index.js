const tape = require('tape')
const bent = require('bent')
const getPort = require('get-port')

const server = require('./')

const getJSON = bent('json')
const getBuffer = bent('buffer')

const nock = require('nock')

// Use `nock` to prevent live calls to remote services

const context = {}

tape('setup', async function (t) {
	const port = await getPort()
	console.log(port);
	context.server = server.listen(port)
	context.origin = `http://localhost:${port}`

	t.end()
})


tape('should get dependencies', async function (t) {

	console.log(context.origin);
	//const html = (await getBuffer(`${context.origin}/dependencies`)).toString()

	const scope = nock('http://localhost:3000')
	.get('/dependencies')
	.reply(200, 'domain matched')

	// assertions etc
})

// more tests

tape('teardown', function (t) {
	context.server.close()
	t.end()
})
