import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    const url = new URL(req.url);
    const secret = url.searchParams.get("key");

    if (secret !== process.env.ADMIN_KEY) {
        return new Response("Unauthorized", { status: 401 });
    }

    const store = getStore("contact-submissions");
    const { blobs } = await store.list();

    const submissions = await Promise.all(
        blobs.map(async (blob) => {
            const data = await store.get(blob.key, { type: "json" });
            return { id: blob.key, ...data };
        })
    );

    submissions.sort((a, b) => b.submitted_at?.localeCompare(a.submitted_at));

    return new Response(JSON.stringify(submissions), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
};

export const config = {
    path: "/.netlify/functions/get-submissions"
};
