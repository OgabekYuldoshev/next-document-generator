"use client"
import { Editor } from "@monaco-editor/react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
    name: string;
    language?: string;
}
export const CodeEditor = ({ name, language = "html" }: Props) => {
    const { control } = useFormContext()

    return (
        <div className="h-full rounded-lg overflow-hidden">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Editor
                        theme="vs-dark"
                        language={language}
                        defaultValue={field.value}
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />
        </div>
    );
};