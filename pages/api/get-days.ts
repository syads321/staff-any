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
        const query = `SELECT i.id as id, i."day" as "day" ,
        json_agg(json_build_object('starthour', q.starthour, 'endhour', q.endhour, 'title', q.title)) as shifts
 FROM day_shift i LEFT JOIN
      shift q
      ON q."day" = i."day"
 GROUP BY i.id, i."day";
        `
        const client = Client()
        client.connect()

        const response = await client.query(query, [])
        const data = response?.rows
        data.forEach((days : any) => {
            days.shifts = days.shifts.filter((shift : any) => {
                return shift.starthour !== null
            })
        });
        client.end()
        res.status(200).json({ success: true, data: data })
    } catch (e) {
        res.status(200).json({ success: false, message: e.message })
    }
}
