access(all) contract SocialCore {

    access(all) struct Content {
        access(all) let id: String
        access(all) let title: String
        access(all) let previewCID: String
        access(all) let encryptedCID: String
        access(all) let createdAt: UFix64

        init(
            id: String,
            title: String,
            previewCID: String,
            encryptedCID: String,
            createdAt: UFix64
        ) {
            self.id = id
            self.title = title
            self.previewCID = previewCID
            self.encryptedCID = encryptedCID
            self.createdAt = createdAt
        }
    }

    access(all) resource interface ProfilePublic {
        access(all) fun getUsername(): String
        access(all) fun getAvatarCID(): String
        access(all) fun getBio(): String
        access(all) fun getContentIDs(): [String]
        access(all) fun getContent(id: String): Content?
    }

    access(all) resource CreatorProfile: ProfilePublic {
        access(all) var username: String
        access(all) var avatarCID: String
        access(all) var bio: String
        access(self) var contents: {String: Content}

        access(all) fun getUsername(): String { return self.username }
        access(all) fun getAvatarCID(): String { return self.avatarCID }
        access(all) fun getBio(): String { return self.bio }
        access(all) fun getContentIDs(): [String] {
            let ids: [String] = []
            for k in self.contents.keys {
                ids.append(k)
            }
            return ids
        }
        access(all) fun getContent(id: String): Content? { return self.contents[id] }

        access(all) fun setProfile(username: String, avatarCID: String, bio: String) {
            self.username = username
            self.avatarCID = avatarCID
            self.bio = bio
        }

        access(all) fun upsertContent(
            id: String,
            title: String,
            summary: String,
            previewCID: String,
            encryptedCID: String,
            createdAt: UFix64
        ) {
            let c = Content(
                id: id,
                title: title,
                previewCID: previewCID,
                encryptedCID: encryptedCID,
                createdAt: createdAt
            )
            self.contents[id] = c
        }

        access(all) fun removeContent(id: String) {
            self.contents.remove(key: id)
        }

        init(username: String, avatarCID: String, bio: String) {
            self.username = username
            self.avatarCID = avatarCID
            self.bio = bio
            self.contents = {}
        }
    }

    access(all) fun createProfile(username: String, avatarCID: String, bio: String): @CreatorProfile {
        return <- create CreatorProfile(username: username, avatarCID: avatarCID, bio: bio)
    }
}
