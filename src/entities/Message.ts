export default interface IMessage {
  id: number,
  username: string,
  content: string,
  reply_to: number | null,
  modified_at: string,
  created_at: string,
}