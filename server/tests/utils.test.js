import test from 'node:test';import assert from 'node:assert/strict';import {validateUrl,normalizeAlias} from '../src/utils.js';
test('valid http and https',()=>{assert.equal(validateUrl('https://example.com/path'),true);assert.equal(validateUrl('http://example.com'),true);});
test('reject unsafe protocols and invalid strings',()=>{for(const x of ['javascript:alert(1)','file:///etc/passwd','broken','ftp://example.com'])assert.equal(validateUrl(x),false);});
test('alias validation',()=>{assert.equal(normalizeAlias('my-link'),'my-link');assert.equal(normalizeAlias(''),null);assert.throws(()=>normalizeAlias('bad alias'));assert.throws(()=>normalizeAlias('api'));});
