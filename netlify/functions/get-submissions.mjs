import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
    const secret = event.queryStringParameters?.key;

    if (secret !== process.env.ADMIN_KEY) {
        return { statusCode: 401, body: "Unauthorized" };
    }

    try {
        const store = getStore("contact-submissions");
        const { blobs } = await store.list();

        const submissions = await Promise.all(
            blobs.map(async (blob) => {
                const data = await store.get(blob.key, { type: "json" });
                return { id: blob.key, ...data };
            })
        );

        submissions.sort((a, b) => b.submitted_at?.localeCompare(a.submitted_at));

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissions)
        };
    } catch (err) {
        return { statusCode: 500, body: err.message };
    }
};
