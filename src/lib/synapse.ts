import { Synapse, RPC_URLS } from '@filoz/synapse-sdk'
import { randomBytes, createHash } from 'node:crypto'

let privateKey = process.env.FILECOIN_WALLET;
const synapse = await Synapse.create({
  privateKey: privateKey!,
  rpcURL: RPC_URLS.calibration.websocket  // Use calibration testnet for testing
})

const groups: Record<string, string[]> = {}

// TODO
// create group
export function create_group(): string {
  const id = 'grp_' + createHash('sha256').update(randomBytes(32)).digest('hex')
  if (!groups[id]) groups[id] = []
  return id
}

// TODO
// upload content
export async function upload_content(groupId: string, content: string | Uint8Array) {
  if (!groups[groupId]) throw new Error('Unknown groupId')
  const bytes = typeof content === 'string' ? new TextEncoder().encode(content) : content
  const res = await synapse.storage.upload(bytes)
  groups[groupId].push(res.pieceCid.toString())
  return res.pieceCid
}


// TODO
// download content
export async function download_content(cid: string, asText = true) {
  const bytes = await synapse.storage.download(cid)
  return asText ? new TextDecoder().decode(bytes) : bytes
}

// TODO
// Show Content
// If groupId is provided, return { [groupId]: [cid...] }, else return all groups
export function show_all_content_by_group(groupId?: string): Record<string, string[]> {
  if (groupId) return { [groupId]: groups[groupId] ?? [] }
  return { ...groups }
}
