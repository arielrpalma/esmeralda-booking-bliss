
create table public.pagos (
  id bigint primary key,
  status text not null,
  status_detail text,
  amount numeric(12,2) not null,
  payer_email text,
  payer_name text,
  external_reference text unique,
  payment_method_id text,
  raw jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pagos enable row level security;

-- No policies: only service_role (edge functions) can access.

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_pagos_updated_at
before update on public.pagos
for each row execute function public.update_updated_at_column();
