// using built-in fetch

async function testReport() {
    try {
        console.log("Testing /api/reports/monthly...");
        // Use a dummy month/year that likely exists or just check for non-404
        const url = 'http://localhost:5000/api/reports/monthly?month=January&year=2025';
        const res = await fetch(url);
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Response:", text.substring(0, 200));
    } catch (err) {
        console.error("Error:", err.message);
    }
}

testReport();
