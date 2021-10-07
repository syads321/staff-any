import Post from './posts'
export default async function refreshShifts() {
    const days = await Post('/api/get-days', {})
    const newlist = JSON.parse(days.data).data
    return newlist
}