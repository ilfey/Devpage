export default interface IMessage {
  id: number,
  username: string,
  content: string,
  reply_to: number,
  modified_at: string,
}