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

create table if not exists public.away_checklist (
  item_index integer primary key check (item_index >= 0),
  checked boolean not null default false
);

alter table public.away_checklist enable row level security;

grant select, insert, update on public.away_checklist to anon;

drop policy if exists "Anyone can read away checklist" on public.away_checklist;
create policy "Anyone can read away checklist"
  on public.away_checklist
  for select
  to anon
  using (true);

drop policy if exists "Anyone can insert away checklist items" on public.away_checklist;
create policy "Anyone can insert away checklist items"
  on public.away_checklist
  for insert
  to anon
  with check (item_index >= 0);

drop policy if exists "Anyone can update away checklist items" on public.away_checklist;
create policy "Anyone can update away checklist items"
  on public.away_checklist
  for update
  to anon
  using (true)
  with check (item_index >= 0);

create table if not exists public.mural_messages (
  id uuid primary key default gen_random_uuid(),
  author text not null check (author in ('erick', 'rafaela')),
  kind text not null check (kind in ('message', 'update', 'heart')),
  content text not null check (char_length(btrim(content)) between 1 and 280),
  created_at timestamptz not null default now()
);

create index if not exists mural_messages_created_at_idx
  on public.mural_messages (created_at desc);

alter table public.mural_messages enable row level security;

grant select, insert on public.mural_messages to anon;

drop policy if exists "Anyone can read mural messages" on public.mural_messages;
create policy "Anyone can read mural messages"
  on public.mural_messages
  for select
  to anon
  using (true);

drop policy if exists "Anyone can post mural messages" on public.mural_messages;
create policy "Anyone can post mural messages"
  on public.mural_messages
  for insert
  to anon
  with check (
    author in ('erick', 'rafaela')
    and kind in ('message', 'update', 'heart')
    and char_length(btrim(content)) between 1 and 280
  );

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'mural_messages'
  ) then
    execute 'alter publication supabase_realtime add table public.mural_messages';
  end if;
end
$$;
