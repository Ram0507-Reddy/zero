import fetch from 'node-fetch';
import assert from 'assert';

const BASE_URL = 'http://localhost:3000';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

async function runTest(name, fn) {
    process.stdout.write(`TEST: ${name} ... `);
    try {
        await fn();
        console.log(`${GREEN}PASSED${RESET}`);
        return true;
    } catch (e) {
        console.log(`${RED}FAILED${RESET}`);
        console.error('  Error:', e.message);
        return false;
    }
}

async function verifySecurityHeaders() {
    const res = await fetch(BASE_URL);
    const headers = res.headers;

    assert.strictEqual(headers.get('x-frame-options'), 'DENY', 'Missing X-Frame-Options');
    assert.strictEqual(headers.get('x-content-type-options'), 'nosniff', 'Missing X-Content-Type-Options');
    assert.strictEqual(headers.get('referrer-policy'), 'strict-origin-when-cross-origin', 'Missing Referrer-Policy');
    assert.ok(headers.get('content-security-policy'), 'Missing CSP');
}

async function verifyAdminProtection() {
    const res = await fetch(`${BASE_URL}/admin/dashboard`, { redirect: 'manual' });
    assert.ok([307, 308, 302].includes(res.status), `Expected redirect, got ${res.status}`);
    const location = res.headers.get('location');
    assert.ok(location.includes('/admin/login'), `Redirect to ${location} instead of login`);
}

async function verifyContactValidation() {
    // 1. Missing fields
    const res1 = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test' }) // Missing email/message
    });
    assert.strictEqual(res1.status, 400, 'Should reject missing fields');

    // 2. Invalid Email
    const res2 = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test', email: 'invalid-email', message: 'Hello' })
    });
    assert.strictEqual(res2.status, 400, 'Should reject invalid email');

    // 3. XSS Attempt
    const res3 = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: '<script>alert(1)</script>',
            email: 'test@example.com',
            message: 'Hello'
        })
    });
    // Our backend might sanitize or just allow simple text. 
    // The prompt requirement was "Reject HTML / script input" in "Step 1.3".
    // If logic is regex check:
    if (res3.status === 200) {
        throw new Error('XSS Payload accepted (Should be 400)');
    }
}

async function verifyRateLimit() {
    // Send 5 requests rapidly
    const promises = [];
    for (let i = 0; i < 5; i++) {
        promises.push(fetch(`${BASE_URL}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Spam', email: 'spam@example.com', message: 'Spam msg' })
        }));
    }

    const results = await Promise.all(promises);
    const tooMany = results.filter(r => r.status === 429);
    assert.ok(tooMany.length > 0, 'Rate limiting did not trigger');
}

async function main() {
    console.log('--- STARTING PRODUCTION VERIFICATION ---');

    // Check if server is up
    try {
        await fetch(BASE_URL);
    } catch {
        console.error(`${RED}Server not running at ${BASE_URL}. Start it with 'npm start' first.${RESET}`);
        process.exit(1);
    }

    let passed = 0;
    let total = 0;

    total++; if (await runTest('Security Headers', verifySecurityHeaders)) passed++;
    total++; if (await runTest('Admin Route Protection', verifyAdminProtection)) passed++;
    total++; if (await runTest('Contact Form Validation (Security)', verifyContactValidation)) passed++;
    total++; if (await runTest('API Rate Limiting', verifyRateLimit)) passed++;

    console.log('----------------------------------------');
    console.log(`RESULTS: ${passed}/${total} PASSED`);

    if (passed < total) process.exit(1);
}

main();
