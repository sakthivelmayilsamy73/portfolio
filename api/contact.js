export default async function handler(req, res) {
    console.log("METHOD HIT:", req.method);

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const body = req.body ? JSON.parse(JSON.stringify(req.body)) : {};
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // Check if access key is set
        if (!process.env.WEB3FORMS_ACCESS_KEY) {
            console.error("ERROR: WEB3FORMS_ACCESS_KEY environment variable is not set");
            return res.status(500).json({
                success: false,
                message: "Server configuration error: missing API key"
            });
        }

        const formData = new URLSearchParams();
        formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY.trim());
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);
        formData.append("subject", "New Portfolio Message — Sakthivel");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString(),
        });

        console.log("Web3Forms Status:", response.status, response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Web3Forms Error Response:", errorText);
            return res.status(response.status).json({
                success: false,
                message: `Web3Forms API error: ${response.statusText}`,
                details: errorText
            });
        }

        const text = await response.text();
        console.log("Web3Forms Success Response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            result = { success: false, message: "Failed to parse response" };
        }

        return res.status(200).json(result);

    } catch (error) {
        console.log("FULL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
}