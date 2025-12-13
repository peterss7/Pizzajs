import PzButtonBar from "../../forms/buttons/PzButtonBar";
import PzTextInput from "../../forms/inputs/PzTextInput";
import { useAccountContext } from "../../../context/useAccountContext";
import { useEffect } from "react";

type AccountCreateFormProps = {
    width: number;
    height: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export default function AccountCreateForm(props: AccountCreateFormProps) {
    const { newName, setNewName } = useAccountContext();
    const { width, height, canvasRef } = props;

    return (
        <div>
            <PzTextInput
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
                canvasRef={canvasRef}
                buttonsProps={[
                    {
                        left: (width / 10) * 3.25,
                        top: (height / 10) * 4,
                        value: "Submit",
                    },
                    {
                        left: (width / 10) * 4,
                        top: (height / 10) * 4,
                        value: "Cancel",
                    }
                ]} />
        </div>
    );
}