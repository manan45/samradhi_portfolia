import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    const { payload } = await req.json();
    const { name, email, company, message } = payload.data;

    const store = getStore("contact-submissions");

    const key = `${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, '_')}`;

    await store.setJSON(key, {
        name,
        email,
        company: company || '',
        message,
        submitted_at: new Date().toISOString(),
        ip: payload.ip || 'unknown',
        user_agent: payload.user_agent || 'unknown'
    });

    return new Response(JSON.stringify({ stored: true }), { status: 200 });
};

export const config = {
    path: "/.netlify/functions/submission-created"
};
