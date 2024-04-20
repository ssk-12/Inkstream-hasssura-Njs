import { Button } from "./Button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between border-b px-4 bg-slate-50 bg-slate-300 rounded-b-lg border-slate-300 max-h-[60px]">
        <div className="text-lg flex flex-col justify-center font-bold">
            InkStream
        </div>
        <div className="flex flex-col justify-center p-2">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}