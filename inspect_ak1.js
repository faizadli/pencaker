const BASE = "http://localhost:4000";

async function run() {
  try {
    console.log("Logging in...");
    const authResp = await fetch(`${BASE}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "admin@example.com",
        password: "Admin123!",
      }),
    });

    const authData = await authResp.json();
    if (!authResp.ok) throw new Error(authData.message || "Login failed");

    // Check response structure from auth.ts: { role, id, token }
    // It seems it returns { role, id, token } directly or in data property?
    // auth.ts says: const data = await resp.json(); return { token: data.token }
    // So the response body has token directly at root or inside data?
    // Let's assume root based on auth.ts usage: data.token

    const token = authData.token || (authData.data && authData.data.token);
    console.log("Logged in. Token acquired.");

    const headers = { Authorization: `Bearer ${token}` };

    console.log("\nFetching AK1 Layout...");
    try {
      const layoutResp = await fetch(`${BASE}/api/ak1/layout`, { headers });
      const layoutData = await layoutResp.json();
      // console.log("Full Layout Response:", JSON.stringify(layoutData, null, 2));
      const layout = layoutData.data;
      if (layout && layout.coordinates) {
        const ketField = layout.coordinates.find(
          (f) =>
            f.token === "ak1_doc:keterampilan" || f.token === "keterampilan",
        );
        if (ketField) {
          console.log(
            "Layout 'keterampilan' field config:",
            JSON.stringify(ketField, null, 2),
          );
        } else {
          console.log(
            "Layout found but 'keterampilan' field NOT found in coordinates.",
          );
          // Print all tokens to verify
          console.log(
            "Available tokens:",
            layout.coordinates.map((c) => c.token).join(", "),
          );
        }
      } else {
        console.log(
          "No layout coordinates found. Data:",
          JSON.stringify(layoutData, null, 2),
        );
      }
    } catch (e) {
      console.error("Error fetching layout:", e.message);
    }

    console.log("\nFetching AK1 Documents...");
    try {
      const docsResp = await fetch(
        `${BASE}/api/profile/candidate/ak1/documents`,
        { headers },
      );
      const docsData = await docsResp.json();
      // console.log("Full Docs Response:", JSON.stringify(docsData, null, 2));
      const docs = docsData.data;
      if (docs && docs.length > 0) {
        console.log(`Found ${docs.length} documents.`);
        // Check ANY document with keterampilan
        const docWithKet = docs.find((d) => d.keterampilan);
        if (docWithKet) {
          console.log("Found document with 'keterampilan'.");
          console.log(
            "Raw value:",
            JSON.stringify(docWithKet.keterampilan, null, 2),
          );
        } else {
          console.log("No document with 'keterampilan' found in the list.");
          // Print keys of first doc to see if column exists
          console.log("First doc keys:", Object.keys(docs[0]).join(", "));
        }
      } else {
        console.log("No documents found.");
      }
    } catch (e) {
      console.error("Error fetching documents:", e.message);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

run();
