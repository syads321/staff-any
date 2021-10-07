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
        const now = new Date(req.body.day)
        const insertText = 'INSERT INTO day_shift(day) VALUES ($1)'
        const client = Client()
        client.connect()
        await client.query(insertText, [now])
        client.end()
        res.status(200).json({ success: true })
    } catch (e: any) {
        res.status(200).json({ success: false, error: e.message })
    }
}
