import SocialCore from 0x06;

access(all) let PUBLIC_PATH: PublicPath = /public/SocialCoreProfilePublic


access(all) fun main(owner: Address): {String: AnyStruct}? {
    let acct = getAccount(owner)
    let profile = acct.capabilities
        .borrow<&{SocialCore.ProfilePublic}>(PUBLIC_PATH)
        ?? panic("Profile capability not found or wrong type")

    let username = profile.getUsername()
    let avatarCID = profile.getAvatarCID()
    let bio = profile.getBio()
    let contentIDs = profile.getContentIDs()

    return {
        "username": username,
        "avatarCID": avatarCID,
        "bio": bio,
        "contentIDs": contentIDs
    }
}
