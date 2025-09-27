import SocialCore from 0x06;
access(all) let STORAGE_PATH: StoragePath = /storage/SocialCoreCreatorProfile
access(all) let PUBLIC_PATH: PublicPath = /public/SocialCoreProfilePublic

transaction(
    id: String,
    title: String,
    summary: String,
    previewCID: String,
    encryptedCID: String,
    createdAt: UFix64,

) {
    prepare(acct: auth(Capabilities, SaveValue, PublishCapability,BorrowValue,SaveValue) &Account) {

        var profileRef = acct.storage.borrow<&SocialCore.CreatorProfile>(from: STORAGE_PATH)
        let existing: Capability<&{SocialCore.ProfilePublic}>? =
            acct.capabilities.get<&{SocialCore.ProfilePublic}>(PUBLIC_PATH)
        if existing == nil || !(existing!.check()) {
            let cap = acct.capabilities.storage.issue<&{SocialCore.ProfilePublic}>(STORAGE_PATH)
            acct.capabilities.publish(cap, at: PUBLIC_PATH)
        }

        // Perform the upsert on the stored profile
        profileRef!.upsertContent(
            id: id,
            title: title,
            summary: summary,
            previewCID: previewCID,
            encryptedCID: encryptedCID,
            createdAt: createdAt
        )
    }

    execute {
        log("Content upserted into SocialCore profile and public capability ensured.")
    }
}
