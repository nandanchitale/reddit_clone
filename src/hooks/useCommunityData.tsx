import { Community, CommunityState } from '@/atoms/CommunitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import { CommunitySnippet } from "@/atoms/CommunitiesAtom";

const useCommunityData = () => {

    const [communityStateValue, setCommunityStateValue] = useRecoilState(CommunityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user] = useAuthState(auth);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        // Is the user signed in?
        // If not => open auth modal

        if (isJoined) { leaveCommunity(communityData.id); return }
        joinCommunity(communityData);
    };

    const joinCommunity = (communityData: Community) => { };

    const leaveCommunity = (communityId: string) => { };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            // Get User snippets
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            );

            const snippets = snippetDocs.docs.map(
                doc => ({ ...doc.data() })
            );

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[]
            }));

            console.log("Here are the snippets", snippets);

        } catch (error) {
            console.log(`getMySnippets Error : ${getMySnippets}`);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user]);

    return {
        // Data and Functions
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    };
}
export default useCommunityData;