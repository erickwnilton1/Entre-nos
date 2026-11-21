"use client";

import { useState, type ReactNode } from 'react';
import { DEFAULT_DATA, type AppData } from '../data/data';
import Gate from './gate/Gate';
import Home from './home/Home';
import Letters from './letters/Letters';
import Memories from './memories/Memories';
import Timeline from './timeline/Timeline';
import WhileAway from './while-away/WhileAway';
import ContentModal from './shared/ContentModal';
import DecorativePetals from './shared/DecorativePetals';
import Navigation from './shared/Navigation';
import type { AppTab, ContentModalState } from './shared/types';

const TABS = [
  ['home', 'Início'],
  ['cartas', 'Cartas'],
  ['mem', 'Memórias'],
  ['enq', 'Enquanto isso'],
  ['tm', 'Marcos']
] as const satisfies readonly (readonly [AppTab, string])[];

export default function EntreNosApp() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState<AppTab>('home');
  const data: AppData = DEFAULT_DATA;
  const [modal, setModal] = useState<ContentModalState | null>(null);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const day = Math.floor((Date.now() - +new Date(data.dep)) / 864e5);

  const closeModal = () => setModal(null);
  const openTab = (nextTab: AppTab) => {
    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content: ReactNode = null;
  if (tab === 'home') content = <Home data={data} />;
  if (tab === 'cartas') content = <Letters data={data} day={day} onOpen={setModal} />;
  if (tab === 'mem') content = <Memories data={data} onOpen={setModal} />;
  if (tab === 'enq') content = <WhileAway data={data} day={day} done={done} setDone={setDone} />;
  if (tab === 'tm') content = <Timeline data={data} />;

  if (!entered) return <Gate onEnter={() => setEntered(true)} />;

  return (
    <>
      <DecorativePetals />
      <Navigation tabs={TABS} currentTab={tab} onSelect={openTab} />
      <main className="wrap" key={tab}>{content}</main>
      {modal && <ContentModal modal={modal} data={data} day={day} onClose={closeModal} />}
    </>
  );
}
