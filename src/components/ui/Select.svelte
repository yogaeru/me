<script lang="ts" generics="Value extends string">
  import { M3eSelectElement } from "@m3e/web/select";
  import "@m3e/web/option";
  import "@m3e/web/form-field";
  import type { FormFieldVariant } from "@m3e/web/form-field";

  interface SelectProps {
    options: { value: Value; label: string; disabled?: boolean }[];
    value?: Value;
    label: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    variant?: FormFieldVariant;
    onValueChange?: (value: Value) => void;
  }

  const generatedId = $props.id();

  let {
    options,
    value = $bindable<Value>(),
    label,
    id = generatedId,
    disabled = false,
    required = false,
    variant = "outlined",
    onValueChange,
  }: SelectProps = $props();

  function handleChange(event: Event) {
    const select = event.currentTarget;
    if (!(select instanceof M3eSelectElement)) return;

    const selectedValue = select.value;
    const option = options.find((option) => option.value === selectedValue);
    if (!option) return;

    value = option.value;
    onValueChange?.(option.value);
  }
</script>

<m3e-form-field {variant}>
  <label slot="label" for={id}>{label}</label>
  <m3e-select {id} {value} {disabled} {required} onchange={handleChange}>
    {#each options as option (option.value)}
      <m3e-option value={option.value} disabled={option.disabled ?? false}>
        {option.label}
      </m3e-option>
    {/each}
  </m3e-select>
</m3e-form-field>

<style>
  m3e-form-field {
    display: block;
    width: 100%;
    min-width: 0;
  }
</style>
