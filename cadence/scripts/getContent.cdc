import SocialCore from 0x06;

access(all) let PUBLIC_PATH: PublicPath = /public/SocialCoreProfilePublic

access(all) fun main(owner: Address, id: String): {String: String}? {
    let acct = getAccount(owner)
    let profile = acct.capabilities.borrow<&{SocialCore.ProfilePublic}>(PUBLIC_PATH)
        ?? panic("Profile capability not found or wrong type")
    let item: SocialCore.Content? = profile.getContent(id:id)
    if let c = item {
        return {
            "id": c.id,
            "title": c.title,
            "previewCID": c.previewCID,
            "encryptedCID": c.encryptedCID,
            "createdAt": c.createdAt.toString()
        }
    }

    return nil
}
