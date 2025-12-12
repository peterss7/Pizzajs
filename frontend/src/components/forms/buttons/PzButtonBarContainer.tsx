import PZButton from "./PZButton";

type PzButtonBar = {

}

export default function PzButtonBarContainer(props: PzButtonBar) {
    const { } = props;

    return (
        <>
            <PZButton
                elementLocation={{
                    left: 340,
                    bottom: 315,
                    width: 60,
                    height: 20
                }}
                value={"Submit"}
                onClick={onSubmitInput}
            />
            <PZButton
                elementLocation={{
                    left: 410,
                    bottom: 315,
                    width: 60,
                    height: 20
                }}
                value={"Cancel"}
                onClick={onCancelInput}
            />
        </>
    );
}