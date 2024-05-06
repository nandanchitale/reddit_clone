import { Community, CommunityState } from '@/atoms/CommunitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { collection, doc, getDoc, getDocs, increment, writeBatch } from 'firebase/firestore';
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

    const joinCommunity = async (communityData: Community) => {
        // Batch Write operation
        // Create new community snippet
        // Update the number of members
        try {
            const batch = writeBatch(firestore);
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || ""
            };

            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippet`,
                    communityData.id
                ),
                newSnippet
            )

            batch.update(
                doc(firestore, 'community', communityData.id),
                {
                    numberOfMembers: increment(1)
                }
            );

            await batch.commit();

            // Update recoil state = communityState.mySnippet
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }));
        }
        catch (error: any) {
            console.log(`joinCommunity Error :  ${error}`);
            setError(error.message);
        }

        setLoading(false);
    };

    const leaveCommunity = (communityId: string) => {
        // Batch Write operation
        // Remove community snippet
        // Update the number of members (-1)
        try {
            const batch = writeBatch(firestore);

            // delete the community snippet from user
            batch.delete(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityId
                )
            );

            batch.update(
                doc(
                    firestore, "community", communityId
                ),
                {
                    numberOfMembers: increment(-1)
                }
            );

            // Update recoil state = communityState.mySnippet
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId)
            }));
        }
        catch (error: any) {
            console.log(`leaveCommunity Error :  ${error}`);
            setError(error.message);
        }

        setLoading(false);
    };

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

        } catch (error: any) {
            console.log(`getMySnippets Error : ${getMySnippets}`);
            setError(error.message)
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