import { db } from "@/db";
import auth from "../app/middleware";
import { revalidatePath } from "next/cache";
import { VoteButton } from "./VoteButton";

export async function Vote({ postId, votes }) {
  // NH - fetching session outside of the functions to pass as prop to vote buttons
  const session = await auth();
  console.log(session);

  async function upvote() {
    "use server";
    try {
      const session = await auth();
      console.log("Upvote", postId, "by user", session.user.id);
      await db.query(
        "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)",
        [session.user.id, postId, 1, "post"]
      );

      revalidatePath("/");
      revalidatePath(`/post/${postId}`);
    } catch (error) {
      return {
        message: "You have already voted",
      };
    }
  }

  async function downvote() {
    "use server";
    try {
      const session = await auth();
      console.log("Downvote", postId, "by user", session.user.id);
      await db.query(
        "INSERT INTO votes (user_id, post_id, vote, vote_type) VALUES ($1, $2, $3, $4)",
        [session.user.id, postId, -1, "post"]
      );

      revalidatePath("/");
      revalidatePath(`/post/${postId}`);
    } catch (error) {
      return {
        message: "You have already voted",
      };
    }
  }

  // NH - added try catch to vote function to catch the constraint error, have not yet rendered error onto page to alert user that they can only vote once

  return (
    <>
      {votes} votes
      <div className="flex space-x-3">
        <form action={upvote}>
          <VoteButton label="Upvote" session={session} />
        </form>
        <form action={downvote}>
          <VoteButton label="Downvote" session={session} />
        </form>
      </div>
    </>
  );
}
