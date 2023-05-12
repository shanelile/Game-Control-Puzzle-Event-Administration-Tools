import type { Meta, StoryObj } from '@storybook/react';
import { SubmittableItem } from "./SubmittableItem";

const meta: Meta<typeof SubmittableItem> = {
    title: 'SubmittableItem',
    component: SubmittableItem,
    argTypes: {
        solveTime: {
            control: 'date'
        },
        unlockTime: {
            control: 'date'
        },
    }
};

export default meta;
type Story = StoryObj<typeof SubmittableItem>;

export const Primary: Story = {
    args: {
        title: "Puzzle #1"
    }
};