async function test() {
    try {
        console.log("Testing /api/rooms...");
        const res = await fetch('http://localhost:5000/api/rooms');
        console.log("Status:", res.status);
        const data = await res.text();
        console.log("Data:", data);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

test();
