import SocialCore from 0x06;


access(all) let STORAGE_PATH: StoragePath = /storage/SocialCoreCreatorProfile

access(all) let PUBLIC_PATH: PublicPath = /public/SocialCoreProfilePublic

// Upsert content into the caller's profile.
// If the profile doesn't exist, it is created first.
transaction(
    id: String,
    title: String,
    summary: String,
    previewCID: String,
    encryptedCID: String,
    createdAt: UFix64,
    // Optional: bootstrap values if profile is missing
    defaultUsername: String,
    defaultAvatarCID: String,
    defaultBio: String
) {
    prepare(acct: auth(Capabilities, SaveValue, PublishCapability,BorrowValue,SaveValue) &Account) {
        // Ensure profile exists (create if missing)
        var profileRef = acct.storage.borrow<&SocialCore.CreatorProfile>(from: STORAGE_PATH)
        
        // Publish public capability to {ProfilePublic} if absent
        let existing: Capability<&{SocialCore.ProfilePublic}>? =
            acct.capabilities.get<&{SocialCore.ProfilePublic}>(PUBLIC_PATH)
        if existing == nil || !(existing!.check()) {
            // Issue a storage capability to the stored resource and publish it [web:22]
            let cap = acct.capabilities.storage.issue<&{SocialCore.ProfilePublic}>(STORAGE_PATH)
            // If a capability already exists at PUBLIC_PATH, publish will fail; unpublish or choose a unique path if needed [web:22][web:23]
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
