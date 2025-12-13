import PzButtonBar from "../../components/ui/buttons/PzButtonBar";
import PzInput from "../../components/ui/inputs/PzInput";
import { useAccountContext } from "../../store/useAccountContext";
import type { AccountDto } from "../../types/AccountDto";

type AccountCreateFormProps = {
    width: number;
    height: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function AccountCreateForm(props: AccountCreateFormProps) {
    const { newName, setNewName, setNewAccount, createAccount } = useAccountContext();
    const { width, height } = props;

    async function onSubmit() {
        console.log(`submitting name: ${newName}`);
        setNewAccount((prevState: AccountDto) => ({ ...prevState, name: newName }));
        await createAccount();
    }

    function onCancel() {
        console.log(`cancelling account creation`);
        setNewName("");
    }

    return (
        <div>
            <PzInput
                value={newName}
                onChange={(value: string) => {
                    setNewName(value);
                    console.log(value);
                }}
                top={(height / 10) * 3.25}
                left={(width / 10) * 3}
                width={200}
                height={15}
                placeholder={"Enter username"}
            />
            <PzButtonBar
                buttonsProps={[
                    {
                        left: (width / 10) * 3.25,
                        top: (height / 10) * 4,
                        value: "Submit",
                        onClick: onSubmit
                    },
                    {
                        left: (width / 10) * 4,
                        top: (height / 10) * 4,
                        value: "Cancel",
                        onClick: onCancel
                    }
                ]} />
        </div>
    );
}