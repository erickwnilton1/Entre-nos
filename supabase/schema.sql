create table if not exists public.presence_hearts (
  id uuid primary key default gen_random_uuid(),
  author text not null check (author in ('eu', 'rafaela')),
  created_at timestamptz not null default now()
);

create index if not exists presence_hearts_created_at_idx
  on public.presence_hearts (created_at desc);

alter table public.presence_hearts enable row level security;

grant select, insert on public.presence_hearts to anon;

drop policy if exists "Anyone can read presence hearts" on public.presence_hearts;
create policy "Anyone can read presence hearts"
  on public.presence_hearts
  for select
  to anon
  using (true);

drop policy if exists "Anyone can leave a presence heart" on public.presence_hearts;
create policy "Anyone can leave a presence heart"
  on public.presence_hearts
  for insert
  to anon
  with check (author in ('eu', 'rafaela'));
