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
        const day = new Date(req.body.day)
        const insertText = 'INSERT INTO shift(title, starthour, endhour, day) VALUES ($1, $2, $3, $4)'
        const client = Client()
        client.connect()
        await client.query(insertText, [req.body.title, req.body.starthour, req.body.endhour, day])
        client.end()
        res.status(200).json({ success: true })
    } catch (e: any) {
        res.status(200).json({ success: false, error: e.message })
    }
}
