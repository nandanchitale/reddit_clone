import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: 'public' | 'restricted' | 'private'
    createdAt?: Timestamp;
    imageURL?: string;
}

export interface CommunitySnippet {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string
}

interface CommunityState {
    mySnippets: CommunitySnippet[]

    // visitedCommunities
}

const defaultCommunityState: CommunityState = {
    mySnippets: []
}

export const CommunityState = atom<CommunityState>({
    key: "communityState",
    default: defaultCommunityState
})