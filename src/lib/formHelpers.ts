import { useState, useCallback, FormEvent } from 'react';
import { FieldValidators, ValidationErrors, validateForm } from './validation';

export interface UseFormValidationReturn<T> {
  values: T;
  errors: ValidationErrors;
  touched: Record<string, boolean>;
  handleChange: (field: keyof T, value: string) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: (e: FormEvent) => void;
  setFieldError: (field: keyof T, error: string) => void;
  resetForm: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

export function useFormValidation<T extends Record<string, unknown>>(
  initialValues: T,
  validators: FieldValidators,
  onSubmit: (values: T) => void | Promise<void>
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({} as ValidationErrors);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback(
    (field: keyof T, value: string): string | null => {
      const rules = validators[field as string];
      if (!rules) return null;

      for (const rule of rules) {
        const error = rule(value);
        if (error) return error;
      }
      return null;
    },
    [validators]
  );

  const validateAllFields = useCallback(() => {
    const newErrors: ValidationErrors = {} as ValidationErrors;
    for (const [field, rules] of Object.entries(validators)) {
      const error = validateField(field as keyof T, String(values[field]));
      if (error) newErrors[field] = error;
    }
    setErrors(newErrors);
    return newErrors;
  }, [values, validators, validateField]);

  const handleChange = useCallback(
    (field: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      // Validate field on change if it has been touched
      if (touched[field as string]) {
        const error = validateField(field, value);
        setErrors((prev) => ({
          ...prev,
          [field as string]: error || '',
        }));
      }
    },
    [validateField, touched]
  );

  const handleBlur = useCallback(
    (field: keyof T) => {
      setTouched((prev) => ({ ...prev, [field as string]: true }));

      // Validate field on blur
      const error = validateField(field, String(values[field]));
      setErrors((prev) => ({
        ...prev,
        [field as string]: error || '',
      }));
    },
    [validateField, values]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const newTouched: Record<string, boolean> = {} as Record<string, boolean>;
      for (const field of Object.keys(validators)) {
        newTouched[field] = true;
      }
      setTouched(newTouched);

      // Validate all fields
      const validationErrors = validateAllFields();

      // Check if form is valid
      const isFormValid = Object.keys(validationErrors).length === 0;

      if (isFormValid) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validators, validateAllFields, onSubmit]
  );

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [field as string]: error }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({} as ValidationErrors);
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
    resetForm,
    isValid,
    isSubmitting,
  };
}
