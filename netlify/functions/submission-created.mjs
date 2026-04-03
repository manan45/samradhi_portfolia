import { getStore } from "@netlify/blobs";

export const handler = async (event) => {
    try {
        const payload = JSON.parse(event.body).payload;
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

        return { statusCode: 200 };
    } catch (err) {
        console.error('submission-created error:', err);
        return { statusCode: 500, body: err.message };
    }
};
