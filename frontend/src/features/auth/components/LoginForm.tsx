import PzInput from "../../../components/ui/inputs/PzInput";
import PzButtonBar from "../../../components/ui/buttons/PzButtonBar";

type Props = {
    width: number;
    height: number;
    left: number;
    top: number,
    usernameValue: string;
    passwordValue: string;
    setUsernameValue: (value: string) => void;
    setPasswordValue: (value: string) => void;
    onLogin: () => void;
}

export default function LoginForm(props: Props) {
    const {
        width,
        height,
        left,
        top,
        usernameValue,
        passwordValue,
        setUsernameValue,
        setPasswordValue,
        onLogin } = props;
    const widthUnit = width / 10;
    const heightUnit = height / 10;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <PzInput
                value={usernameValue ?? ""}
                label="Username:"
                labelLeft={left + widthUnit * .6}
                onChange={(value: string) => setUsernameValue(value)}
                left={left + widthUnit * 2.8}
                top={top + heightUnit * 2}
                width={widthUnit * 6}
                height={15}
                placeholder={"Enter username..."}
            />
            <PzInput
                value={passwordValue ?? ""}
                label="Password:"
                labelLeft={left + widthUnit * .6}
                onChange={(value: string) => setPasswordValue(value)}
                left={left + widthUnit * 2.8}
                top={top + heightUnit * 4}
                width={widthUnit * 6}
                height={15}
                placeholder={"Enter password..."}
            />
            <PzButtonBar
                buttonsProps={[
                    {
                        left: (left + widthUnit * 4),
                        top: (top + heightUnit * 7),
                        value: "Sign In",
                        onClick: onLogin
                    }
                ]}
            />
        </div>
    )
}