import React from "react";
import {
  FormControl,
  FormField as HookFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Control,
  Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  // control?: any;
  control: Control<T>;
  name: Path<T>;
  label: string | React.ReactNode;
  className?: string;
  render: ({
    field,
    fieldState,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
  }) => React.ReactNode;
}

const FormFieldRenderProps = <T extends FieldValues>({
  control,
  name,
  label,
  render,
  className,
}: Props<T>) => {
  return (
    <HookFormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel className="text-zinc-200">{label}</FormLabel>
          <FormControl>{render({ field, fieldState })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldRenderProps;
