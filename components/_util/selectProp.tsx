export interface SelectProps {
    name?: string;
    value?: string;
    child?: string;
    options: SelectDownOptionProps[];
}

export type SelectDownOptionProps = {
    title: string;
    key: string;
}