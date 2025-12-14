import { createContext, type ReactNode, useState, useEffect, useContext, type SetStateAction } from "react";
import { useAccountApi, type CreateAccountRequest,  } from "../lib/useAccountApi";
import type { AccountDto } from "../types/AccountDto";
import useKeys from "../lib/useKeys";


type AccountContextValue = {
    newAccount: AccountDto;
    setNewAccount: React.Dispatch<SetStateAction<AccountDto>>;
    newName: string;
    setNewName: (value: string) => void;
    accounts: AccountDto[];
    createAccount: () => Promise<void>;
    isCreateOpen: boolean;
    setIsCreateOpen: React.Dispatch<SetStateAction<boolean>>;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

type AccountProviderProps = {
    children: ReactNode;
}

export const INITIAL_ACCOUNT: AccountDto = {
    id: "0",
    name: ""
}

export function AccountProvider({
    children
}: AccountProviderProps) {
    const [accounts, setAccounts] = useState<AccountDto[]>([]);
    const [newAccount, setNewAccount] = useState<AccountDto>(INITIAL_ACCOUNT);
    const [newName, setNewName] = useState<string>("");
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

    const { getAccounts, postAccount } = useAccountApi();
    const  keys = useKeys();

    const createAccount = async () => {

        await postAccount(newAccount as CreateAccountRequest).then((createdAccount) => {
            if (createdAccount) {
                console.log("created account", createdAccount);
                setNewAccount(INITIAL_ACCOUNT);
                accounts.push({ ...createdAccount });
                setIsCreateOpen(false);
            }
        });

        
    }

    useEffect(() => {
        (async () => {
            const currentAccounts = await getAccounts();
            setAccounts(currentAccounts ?? [])
        })();
    }, [getAccounts]);

   

    const contextValue = {
        newAccount,
        setNewAccount,
        newName,
        setNewName,
        accounts,
        createAccount,
        isCreateOpen,
        setIsCreateOpen
    }

    return (
        <AccountContext.Provider value={contextValue}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccountContext(): AccountContextValue {
    const ctx = useContext(AccountContext);
    if (!ctx) {
        throw new Error("useAccountContext must used inside AccountProvider");
    }
    return ctx;
}