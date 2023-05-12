import moment, { Moment } from "moment";
import ListGroup from "react-bootstrap/ListGroup";

type Props = Readonly<{
    title: string
    unlockTime?: Moment;
    solveTime?: Moment;
}>;

export const SubmittableItem = ({ title, unlockTime, solveTime }: Props) => {
    const TimeStamp = () => {
        if (solveTime) {
            return (
                <div>
                    <small>Solved: {moment.utc(solveTime).fromNow()}</small>
                </div>
            );
        } else if (unlockTime) {
            <div>
                <div><small>Unlocked: {moment.utc(unlockTime).fromNow()}</small></div>
            </div>
        }

        return null;
    }

    return (
        <ListGroup.Item>
            <div>{title}</div>
            <TimeStamp/>
        </ListGroup.Item>
    );
};