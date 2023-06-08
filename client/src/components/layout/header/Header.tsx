import Link from "next/link";
import React from "react";

interface Props {
  currentUser: UserResponse;
}
export const Header: React.FC<Props> = ({ currentUser }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 px-4 py-4">
      <Link
        href="/"
        className="text-2xl font-bold text-gray-900 hover:text-gray-700"
      >
        GitTix
      </Link>
      <div className="flex gap-4">
        {currentUser ? (
          <>
            Hi {currentUser.email}
            <Link
              href="/auth/signout"
              className="text-gray-900 hover:text-blue-800"
            >
              Sign Out
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="text-gray-900 hover:text-blue-800"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="text-gray-900 hover:text-blue-800"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
