// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Client from '../../backend-services/Client'
type Data = {
    success: boolean,
    error?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        const query = `DELETE FROM day_shift 
        WHERE id = $1;
        `
        const deleteshift = `DELETE FROM shift 
        WHERE day = $1;`
        const client = Client()
        client.connect()
        await client.query(query, [req.body.id])
        await client.query(deleteshift, [req.body.day])
        client.end()
        res.status(200).json({ success: true })
    } catch (e: any) {
        res.status(200).json({ success: false, error: e.message })
    }
}
