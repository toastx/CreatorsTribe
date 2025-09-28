import { useState, useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import { useWallet } from '@/contexts/WalletContext';

// Import Cadence scripts
const GET_PROFILE_SCRIPT = `
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
`;

const GET_CONTENT_SCRIPT = `
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
`;

export const useFlowScripts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useWallet();

  const executeScript = async (cadence: string, args: any[] = []) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fcl.query({
        cadence,
        args,
      });
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Script execution failed');
      setLoading(false);
      throw err;
    }
  };

  const getProfile = async (address?: string) => {
    const targetAddress = address || user.addr;
    if (!targetAddress) {
      throw new Error('No address provided');
    }

    return executeScript(GET_PROFILE_SCRIPT, [
      fcl.arg(targetAddress, fcl.t.Address),
    ]);
  };

  const getContent = async (contentId: string, address?: string) => {
    const targetAddress = address || user.addr;
    if (!targetAddress) {
      throw new Error('No address provided');
    }

    return executeScript(GET_CONTENT_SCRIPT, [
      fcl.arg(targetAddress, fcl.t.Address),
      fcl.arg(contentId, fcl.t.String),
    ]);
  };

  return {
    loading,
    error,
    executeScript,
    getProfile,
    getContent,
  };
};
