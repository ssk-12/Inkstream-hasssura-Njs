"use server"
import { GET_BLOGS_QUERY } from "../graphql-operations";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { serverClient } from "../apollo-server";

export async function fetchBlog() {
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }


    const res = await serverClient.mutate({
        mutation: GET_BLOGS_QUERY,
    })

    console.log(res)

    return res.data.Post;

}
