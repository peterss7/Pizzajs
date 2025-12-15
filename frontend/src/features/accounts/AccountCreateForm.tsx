import { useEffect } from "react";
import PzButtonBar from "../../components/ui/buttons/PzButtonBar";
import PzInput from "../../components/ui/inputs/PzInput";
import { INITIAL_ACCOUNT, useAccountContext } from "../../stores/useAccountContext";
import useKeys from "../../hooks/useKeys";

type AccountCreateFormProps = {
    width: number;
    height: number;
}

export default function AccountCreateForm(props: AccountCreateFormProps) {
    const {
        newAccount,
        setNewAccount,
        createAccount,
        isCreateOpen,
    } = useAccountContext();

    const { width, height } = props;
    const keys = useKeys();

    async function onSubmit() {
        await createAccount();
    }

    function onCancel() {
        setNewAccount(INITIAL_ACCOUNT);
    }

    useEffect(() => {
        console.log(`key hit`);
        if (keys?.enter && isCreateOpen) {
            if (newAccount.name) {
                createAccount();
            }
        }
    }, [keys]);

    return (
        <div>
            {isCreateOpen &&
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <PzInput
                            value={newAccount.name}
                            onChange={(value: string) => setNewAccount((prevState) => ({ ...prevState, name: value }))}
                            top={(height / 10) * 3.25}
                            left={(width / 10) * 3}
                            width={150}
                            height={15}
                            placeholder={"Enter username..."}
                        />
                        <PzInput
                            value={newAccount.password}
                            onChange={(value: string) => setNewAccount((prevState) => ({ ...prevState, password: value }))}
                            top={(height / 10) * 3.75}
                            left={(width / 10) * 3}
                            width={150}
                            height={15}
                            placeholder={"Enter password..."}
                        />
                    </div>
                    <PzButtonBar
                        buttonsProps={[
                            {
                                left: (width / 10) * 2.9,
                                top: (height / 10) * 4.35,
                                value: "Submit",
                                onClick: onSubmit
                            },
                            {
                                left: (width / 10) * 4,
                                top: (height / 10) * 4.35,
                                value: "Cancel",
                                onClick: onCancel
                            }
                        ]} />
                </>
            }
        </div>
    );
}