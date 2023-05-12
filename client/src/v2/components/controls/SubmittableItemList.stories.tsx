import type { Meta, StoryObj } from '@storybook/react';
import { SubmittableItemList } from './SubmittableItemList';

const meta: Meta<typeof SubmittableItemList> = {
    title: 'SubmittableItemList',
    component: SubmittableItemList    
};

export default meta;
type Story = StoryObj<typeof SubmittableItemList>;

export const Primary: Story = {
    args: {
        submittables: [
            {
                title: "Puzzle #1"
            },
            {
                title: "Puzzle #2"
            },
            {
                title: "Puzzle #3"
            }
        ]
    }
}