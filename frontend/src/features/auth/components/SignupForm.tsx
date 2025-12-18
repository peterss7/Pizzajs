import PzButtonBar from "../../../components/ui/buttons/PzButtonBar";
import PzInput from "../../../components/ui/inputs/PzInput";
import type { HtmlElement } from "../../../types/HtmlElement"

type Props = {
    email: string;
    password: string;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    onSubmit: () => void;
} & HtmlElement;

export default function SignupForm(props: Props) {

    const { 
        top,
        left, 
        width, 
        height, 
        email, 
        password, 
        setEmail, 
        setPassword,
        onSubmit
    } = props;

    const widthUnit = (width ?? 0) / 10;
    const heightUnit  = (height ?? 0) / 10;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <PzInput
                value={email ?? ""}
                label="Email"
                labelLeft={(left ?? 0) + widthUnit * .6}
                onChange={(value: string) => setEmail(value)}
                left={(left ?? 0) + widthUnit * 2.8}
                top={(top ?? 0) + heightUnit * 2}
                width={widthUnit * 6}
                height={15}
                placeholder={"Enter email..."}
            />
            <PzInput
                value={password ?? ""}
                label="Password:"
                labelLeft={(left ?? 0) + widthUnit * .6}
                onChange={(value: string) => setPassword(value)}
                left={(left ?? 0) + widthUnit * 2.8}
                top={(top ?? 0) + heightUnit * 4}
                width={widthUnit * 6}
                height={15}
                placeholder={"Enter password..."}
            />
            <PzButtonBar
                buttonsProps={[
                    {
                        left: ((left ?? 0) + widthUnit * 4.5),
                        top: ((top ?? 0) + heightUnit * 6.25),
                        value: "Submit",
                        onClick: onSubmit
                    }
                ]}
            />            
        </div>
    )
}