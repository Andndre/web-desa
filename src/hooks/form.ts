"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const useFormSubmit = function <SchemaType extends FieldValues>(
  onSubmit: (
    data: SchemaType,
    setError: (error: string) => void
  ) => Promise<void>
) {
  const [loading, setLoading] = useState(false);
  const [errorValue, setErrorValue] = useState<string | null>(null);

  const onSubmitForm: SubmitHandler<SchemaType> = async (data: SchemaType) => {
    setLoading(true);
    await onSubmit(data, setErrorValue);
    setLoading(false);
  };

  const form = useForm<SchemaType>();

  const handleSubmit = () => form.handleSubmit(onSubmitForm);

  return {
    ...form,
    onSubmitForm,
    loading,
    errorValue,
    handleSubmit,
  };
};
