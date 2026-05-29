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

        const formData = new URLSearchParams();
        formData.append("access_key", process.env.WEB3FORMS_ACCESS_KEY);
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

        const text = await response.text(); // IMPORTANT DEBUG LINE
        console.log("Web3Forms raw response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            result = { success: false, message: text };
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