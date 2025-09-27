import SocialCore from 0x06;

access(all) let STORAGE_PATH: StoragePath = /storage/SocialCoreCreatorProfile

access(all) let PUBLIC_PATH: PublicPath = /public/SocialCoreProfilePublic

transaction(username: String, avatarCID: String, bio: String) {

   prepare(signer: auth(
        BorrowValue,    // needed for signer.storage.borrow
        SaveValue,                                 // to save the profile to storage
        StorageCapabilities, // to issue storage capabilities
        PublishCapability                          // to publish the capability at /public
    ) &Account) {
        // If a profile already exists, destroy the newly created one and abort
        if signer.storage.borrow<&SocialCore.CreatorProfile>(from: STORAGE_PATH) != nil {
            panic("Profile already initialized at /storage/SocialCoreCreatorProfile")
        }

        // Create the profile resource from the SocialCore contract
        let profile <- SocialCore.createProfile(
            username: username,
            avatarCID: avatarCID,
            bio: bio
        )

        // Save the resource into account storage
        signer.storage.save(<-profile, to: STORAGE_PATH)

        // Issue and publish a capability exposing only the ProfilePublic interface
        let cap = signer.capabilities.storage.issue<&{SocialCore.ProfilePublic}>(STORAGE_PATH)
        signer.capabilities.publish(cap, at: PUBLIC_PATH)
    }

    execute {
        log("SocialCore profile created and public capability published.")
    }
}
