"use client";

import { FormEvent, useState } from "react";

import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Toggle } from "@/components/ui/Toggle";
import { NotaVersaoCreateInput, NotaVersaoResponse } from "@/domain/models/notaVersao";

type FormState = {
  data: string;
  sprint: string;
  mensagem: string;
  ativo: boolean;
};

type NotaVersaoFormProps = {
  initialValue?: NotaVersaoResponse | null;
  onSubmit: (payload: NotaVersaoCreateInput) => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

const emptyState: FormState = {
  data: "",
  sprint: "",
  mensagem: "",
  ativo: true,
};

export function NotaVersaoForm({
  initialValue,
  onSubmit,
  onCancel,
  isSubmitting,
}: NotaVersaoFormProps) {
  const [formState, setFormState] = useState<FormState>(() =>
    initialValue ? toFormState(initialValue) : emptyState,
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(formState);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit({
      data: formState.data,
      sprint: Number(formState.sprint),
      mensagem: formState.mensagem,
      ativo: formState.ativo,
    });
  };

  return (
    <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {initialValue ? "Editar nota de versao" : "Nova nota de versao"}
          </p>
          <p className="text-xs text-slate-500">
            Preencha os campos obrigatorios para salvar.
          </p>
        </div>
        {initialValue && (
          <button
            type="button"
            className="btn-ghost text-xs"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar edicao
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Data"
          type="date"
          value={formState.data}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, data: event.target.value }))
          }
          error={errors.data}
          required
        />

        <Input
          label="Sprint"
          type="number"
          min={0}
          value={formState.sprint}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, sprint: event.target.value }))
          }
          error={errors.sprint}
          required
        />
      </div>

      <Textarea
        label="Mensagem"
        minLength={3}
        rows={4}
        value={formState.mensagem}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, mensagem: event.target.value }))
        }
        error={errors.mensagem}
        required
      />

      <Toggle
        label="Ativo"
        checked={formState.ativo}
        onChange={(event) =>
          setFormState((prev) => ({ ...prev, ativo: event.target.checked }))
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : initialValue ? "Atualizar" : "Criar"}
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn-ghost"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Descartar
          </button>
        )}
      </div>
    </form>
  );
}

function validate(state: FormState) {
  const validationErrors: Partial<Record<keyof FormState, string>> = {};

  if (!state.data) validationErrors.data = "Informe a data da nota.";

  if (!state.sprint && state.sprint !== "0") {
    validationErrors.sprint = "Informe o numero da sprint.";
  }

  if (state.mensagem.trim().length < 3) {
    validationErrors.mensagem = "Mensagem deve ter pelo menos 3 caracteres.";
  }

  return validationErrors;
}

function toFormState(value: NotaVersaoResponse): FormState {
  return {
    data: value.data,
    sprint: String(value.sprint),
    mensagem: value.mensagem,
    ativo: value.ativo,
  };
}
