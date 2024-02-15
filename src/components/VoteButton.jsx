"use client";

import { useFormStatus } from "react-dom";

export function VoteButton({ label, session }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="border rounded border-zinc-600 px-3 py-2 hover:bg-pink-400 hover:text-black disabled:bg-grey-200"
      disabled={pending || !session}
    >
      {pending ? `Saving ${label}` : session ? label : `Log in to vote`}
    </button>
  );
}
// NH - added conditional based on session to disable button if user not logged in, also added styling for disabled button. Opted for this as apposed to error message for better user experience rather than failed click and error or taken away from page
