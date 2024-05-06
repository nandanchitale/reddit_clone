import { Community } from '@/atoms/CommunitiesAtom';
import Header from '@/components/Community/Header';
import NotFound from '@/components/Community/NotFound';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import safeJsonStringify from 'safe-json-stringify';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    console.log(`communityData : ${communityData}`);

    if (!communityData) return <NotFound />;

    return (
        <>
            <Header communityData={communityData} />
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // Get the community data and pass it to client
    try {
        const communityDocRef = doc(
            firestore,
            'community',
            context.query.communityId as string
        );

        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({
                    id: communityDoc.id,
                    ...communityDoc.data()
                })) : "",
            },
        };
    } catch (error) {
        // Could add error page here
        console.log(`getServerSideProps Error : ${error}`)
    }
}

export default CommunityPage;