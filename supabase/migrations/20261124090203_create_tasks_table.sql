create table public.tasks (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text not null,
  is_completed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.tasks enable row level security;

create policy "Users can manage their own tasks"
on public.tasks
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
