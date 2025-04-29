const submitBtn = document.getElementById("submitBtn");
const resultCont = document.getElementById("resultcont");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Clicked");

    let key = "ema_live_5FkH5N3kWxIgRq7VeKuMDfq5KlyG9ux0bTZEFkg3";
    let email = document.getElementById("email").value.trim();
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    resultCont.innerHTML = `<div>🔄 Validating <strong>${email}</strong>...</div>`;

    try {
        let res = await fetch(url);
        let result = await res.json();
        let str = "";

        for (let key of Object.keys(result)) {
            let value = result[key];

            if (value !== "" && value !== " ") {
                let displayValue = value;

                // Add ✅ or ❌ for boolean-like results
                if (typeof value === "boolean") {
                    displayValue = value ? "✅ Yes" : "❌ No";
                }

                // Format the key nicely
                let formattedKey = key.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());

                str += `<div><strong>${formattedKey}</strong>: ${displayValue}</div>`;
            }
        }

        resultCont.innerHTML = str;

    } catch (error) {
        console.error("Error fetching validation:", error);
        resultCont.innerHTML = `<div style="color: red;">❌ Failed to validate. Please try again later.</div>`;
    }
});
