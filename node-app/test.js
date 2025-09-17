import assert from 'assert';
import http from 'http';

describe('Node Stream App', function() {
  it('should serve index.html', function(done) {
    http.get('http://localhost:3000/', res => {
      assert.strictEqual(res.statusCode, 200);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert(data.includes('<!DOCTYPE html>'));
        done();
      });
    }).on('error', done);
  });

  it('should stream time', function(done) {
    http.get('http://localhost:3000/stream', res => {
      assert.strictEqual(res.statusCode, 200);
      let received = false;
      res.on('data', chunk => {
        if (chunk.toString().includes('Hello World!')) received = true;
      });
      setTimeout(() => {
        assert(received);
        done();
      }, 1200);
    }).on('error', done);
  });

  it('should ping tts', function(done) {
    http.get('http://localhost:3000/api/ping/tts', res => {
      assert.strictEqual(res.statusCode, 200);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert(data.includes('pong'));
        done();
      });
    }).on('error', done);
  });
});
