import type { GetStaticProps as _GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import { fetchUsers, User, UsersLoadError } from "../src/api";
import ErrorMessage from "../src/components/ErrorMessage";
import LoadingIndicator from "../src/components/LoadingIndicator";
import PageWrapper from "../src/components/PageWrapper";

// Used for unused getServerSideProps
interface UserListProps {
    initialUsers?: User[];
    initialError?: UsersLoadError | null;
}

function humanizeError(error: Error): string {
    console.warn(error);
    if (error.name === "AbortError") {
        return "Slow API server response, check your internet connection.";
    }

    switch (error.message as UsersLoadError) {
        case UsersLoadError.WrongStatus: {
            return "Received wrong status from the users endpoint.";
        }
        case UsersLoadError.NotArray: {
            return "The users endpoint didn't return an array.";
        }
        default: {
            return "Unknown error while fetching the users endpoint.";
        }
    }
}

/*
 * Pre-fetched data is preferable to gazillion loading spinners. Or even one of them.
 * In the task, one of the points was to show a loading indicator, which would never happen
 * as the data doesn't change so fetching is done client-side only.
 * Here's the code I would use:
 */

/*
export const getStaticProps: _GetStaticProps<UserListProps> = async (_context) => {
    try {
        const users = await fetchUsers();
        return {
            props: {
                initialUsers: users,
            },
        };
    } catch (err) {
        console.error("Failed to load users endpoint.", err);
        const error = typeof err === "string" ? (err as UsersLoadError) : UsersLoadError.UnknownError;

        return {
            props: {
                initialError: error,
            },
        };
    }
};
*/

const UserList: NextPage = ({ initialUsers = [], initialError = null }: UserListProps) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [error, setError] = useState<string | null>(
        initialError === null ? null : humanizeError(new Error(initialError)),
    );
    const [isLoading, setIsLoading] = useState<boolean>(initialUsers.length === 0);

    useEffect(() => {
        // We got initial users, don't refetch
        if (initialUsers.length > 0) return;

        setIsLoading(true);
        setError(null);

        // Little timeout because loading spinners are exciting and very enterprise
        setTimeout(() => {
            fetchUsers()
                .then((users) => setUsers(users))
                .catch((reason: Error) => setError(humanizeError(reason)))
                .finally(() => setIsLoading(false));
        }, 2000);
    }, [initialUsers.length]);

    return (
        <>
            <PageWrapper title="Users">
                {isLoading && (
                    <>
                        <noscript>
                            <ErrorMessage message="This site requires JavaScript. Or not when someone uncomments getStaticProps." />
                        </noscript>
                        <div className="flex h-full grow place-content-center place-items-center py-8">
                            <LoadingIndicator size="69px" />
                        </div>
                    </>
                )}
                {!isLoading && error && <ErrorMessage message={error} />}
                {!isLoading && users && (
                    <section className="flex flex-wrap place-content-center gap-12">
                        {users.map((user, userIndex) => (
                            <article
                                key={user.id}
                                className="flex flex-1 shrink-0 grow flex-col place-items-center gap-4 break-words rounded-xl border p-8 text-center transition-shadow hover:shadow-lg motion-reduce:transition-none dark:border-primary-700 dark:hover:shadow-primary-700 sm:w-0 sm:min-w-max"
                                itemScope
                                itemType="https://schema.org/Person"
                            >
                                <Image
                                    src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                                    alt={`${user.name}'s avatar`}
                                    width={200}
                                    height={200}
                                    layout="fixed"
                                    priority={userIndex < 3}
                                    itemProp="image"
                                />
                                <h2 className="text-3xl font-semibold tracking-wider" itemProp="name">
                                    {user.name}
                                </h2>
                                <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:text-left">
                                    <strong>👻 Username</strong>
                                    <span itemProp="alternateName">{user.username}</span>
                                    <strong>✉️ E-mail</strong>
                                    <a href={`mailto:${user.email}`} itemProp="email">
                                        {user.email}
                                    </a>
                                    <strong>🏡 Address</strong>
                                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                        <div itemProp="streetAddress">
                                            {user.address.street}
                                            <br />
                                            {user.address.suite}
                                        </div>
                                        <div itemProp="postalCode">{user.address.zipcode}</div>
                                        <div itemProp="addressLocality">{user.address.city}</div>
                                        <a
                                            href={`https://www.openstreetmap.org/?mlat=${user.address.geo.lat}&mlon=${user.address.geo.lng}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm"
                                        >
                                            🗺️ OpenStreetMap
                                        </a>
                                    </div>
                                    <strong>📞 Phone</strong>
                                    <a
                                        href={`tel:${user.phone}`}
                                        className="text-cyan-600 hover:text-cyan-700"
                                        itemProp="telephone"
                                    >
                                        {user.phone}
                                    </a>
                                    <strong>🌐 Website</strong>
                                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer" itemProp="url">
                                        {user.website}
                                    </a>
                                    <strong>🏢 Company</strong>
                                    <div>
                                        <div itemProp="jobTitle">{user.company.bs}</div>
                                        <div itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
                                            <div itemProp="legalName">{user.company.name}</div>
                                            <div className="italic" itemProp="slogan">
                                                {user.company.catchPhrase}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>
                )}
            </PageWrapper>
        </>
    );
};

export default UserList;
