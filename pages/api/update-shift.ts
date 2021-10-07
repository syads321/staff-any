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
        const query = `UPDATE shift 
        SET title = $2, starthour = $3, endhour = $4
        WHERE day = $1`
        const client = Client()
        const date = new Date(req.body.day)
        client.connect()
        await client.query(query, [date, req.body.title, req.body.starthour, req.body.endhour])
        client.end()
        res.status(200).json({ success: true })
    } catch (e: any) {
        res.status(200).json({ success: false, error: e.message })
    }
}
