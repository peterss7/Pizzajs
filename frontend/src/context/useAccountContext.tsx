import { createContext, type ReactNode, useState, useEffect, useContext, type SetStateAction } from "react";
import { useAccountApi } from "../adapters/useAccountApi";
import type { AccountDto } from "../shared/types/DtoTypes";

type AccountContextValue = {
    newAccount: AccountDto;
    setNewAccount: React.Dispatch<SetStateAction<AccountDto>>;
    newName: string;
    setNewName: (value: string) => void;
    accounts: AccountDto[];
    createAccount: (account: AccountDto) => Promise<void>;
}

const AccountContext = createContext<AccountContextValue | undefined>(undefined);

type AccountProviderProps = {
    children: ReactNode;
}

const INITIAL_ACCOUNT: AccountDto = {
    id: "0",
    name: ""
}

export function AccountProvider({
    children
}: AccountProviderProps) {
    const [accounts, setAccounts] = useState<AccountDto[]>([]);
    const [newAccount, setNewAccount] = useState<AccountDto>(INITIAL_ACCOUNT);
    const [newName, setNewName] = useState<string>("");

    const { getAccounts, postAccount } = useAccountApi();

    const createAccount = async () => {
        setNewAccount((prevState) => ({ ...prevState, name: newName}));
        console.log("new account", newAccount);
        await postAccount(newAccount);
        setNewName("");
        accounts.push(newAccount);
        accounts.forEach(x => console.log("name", x.name));
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
        createAccount
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