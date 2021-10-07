// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../backend-services/Client'
type Data = {
    success: boolean,
    data?: any,
    message?: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {
        const query = `SELECT id, title, starthour, endhour, "day"
        FROM public.shift where "day" = $1;
        `
        const client = Client()
        client.connect()

        const response = await client.query(query, [req.body.day])
        const data = response?.rows
        client.end()
        res.status(200).json({ success: true, data: data })
       
    } catch (e) {
        res.status(200).json({ success: false, message: e.message })
    }
}
