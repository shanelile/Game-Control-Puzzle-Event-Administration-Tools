import ListGroup from "react-bootstrap/ListGroup";

import { Submittable } from "v2/types";
import { SubmittableItem } from "./SubmittableItem";

type Props = Readonly<{
    submittables: Submittable[];
}>;

export const SubmittableItemList = ( { submittables }: Props ) => {
    return (
        <ListGroup className="clickable">
            {
                submittables.map(
                    submittable =>
                        <SubmittableItem title={submittable.title} solveTime={submittable.solveTime}/>
                )
            }
        </ListGroup>
    )
};