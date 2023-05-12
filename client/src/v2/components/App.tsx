import { useDispatch, useSelector } from "react-redux";

import 'bootstrap/dist/css/bootstrap.min.css';

import { RootState } from "v2/redux/store";
import { update } from 'v2/redux/eventSlice';
import { useGetEventQuery } from "v2/redux/services/eventApi";
import { SubmittableItemList } from "./controls/SubmittableItemList";

export const App = () => {
    const event = useSelector((state: RootState) => state.event);
    const { data, error, isLoading } = useGetEventQuery();
    const dispatch = useDispatch();

    console.log("Event data", { data, error, isLoading });

    return (
        <div>
            <div>
            Coming Soon v2
            </div>
            
            <SubmittableItemList submittables={[
                { title: "Puzzle 1" },
                { title: "Puzzle 2" },
                { title: "Puzzle 3" },
                { title: "Puzzle 4" },
            ]}/>

            <div>
                {JSON.stringify(event)}
            </div>
        </div>
    );
};