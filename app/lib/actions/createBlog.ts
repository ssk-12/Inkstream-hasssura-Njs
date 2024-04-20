"use server";

import { INSERT_POST_MUTATION } from "../graphql-operations";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { serverClient } from "../apollo-server";


export async function createBlog(title: string, content: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const authorId = session.user.id;

    await serverClient.mutate({
        mutation: INSERT_POST_MUTATION,
        variables: {
            title,
            content,
            authorId
        }
    })

    return {
        message: "Done"
    }

}
