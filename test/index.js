const tape = require('tape')
const nock = require('nock')
const bent = require('bent')
const getPort = require('get-port')

const server = require('../index')
const response = require('./response')

const getJSON = bent('json')
const getBuffer = bent('buffer')

const scope = nock(`https://nodejs.org`)	
	.persist()
	.get(/.*/)
	.reply(200,response);

const context = {}

tape('setup', async function (t) {
	const port = await getPort()
	context.server = server.listen(port)
	context.origin = `http://localhost:${port}`
	t.end()
})

tape('test minimum secure versions', async(t) => {
	
		const json = await getJSON(`${context.origin}/minimum-secure`)
		const v0min = json[`v0`].version
		const v4min = json[`v4`].version

		t.equal(v0min, 'v0.12.17', 'v0 should match')
		t.equal(v4min, 'v4.9.0', 'v4 should match')
		t.end();

})

tape('test latest release', async(t) => {
		const json = await getJSON(`${context.origin}/latest-releases`)
		const v14max = json[`v14`].version
		const v13max = json[`v13`].version
	
	   t.equal(v14max, 'v14.10.1', 'v14 should match')
	   t.equal(v13max, 'v13.14.0', 'v13 should match')
	   t.end()

})

tape('should get dependencies', async function (t) {
	const html = (await getBuffer(`${context.origin}/dependencies`)).toString()
	t.plan(3)
	
	t.true(html.indexOf('bent'), 'should contain bent')
	t.true(html.indexOf('express'), 'should contain express')
	t.true(html.indexOf('hbs'), 'should contain hbs')
	t.end()
})



tape('teardown', function (t) {
	context.server.close()
	t.end()
})
