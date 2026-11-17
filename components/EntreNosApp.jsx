"use client";

import { useEffect, useState } from 'react';
import { DEFAULT_DATA } from '../data/data';
import Admin from './admin/Admin';
import Gate from './gate/Gate';
import Home from './home/Home';
import Letters from './letters/Letters';
import Memories from './memories/Memories';
import Playlist from './playlist/Playlist';
import Timeline from './timeline/Timeline';
import WhileAway from './while-away/WhileAway';
import ContentModal from './shared/ContentModal';
import DecorativePetals from './shared/DecorativePetals';
import Navigation from './shared/Navigation';

const TABS = [
  ['home', 'Início'],
  ['cartas', 'Cartas'],
  ['mem', 'Memórias'],
  ['enq', 'Enquanto isso'],
  ['pl', 'Playlist'],
  ['tm', 'Marcos']
];

export default function EntreNosApp() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState('home');
  const [data, setData] = useState(() => {
    try {
      return { ...DEFAULT_DATA, ...JSON.parse(localStorage.getItem('entre-nos-config') || '{}') };
    } catch {
      return DEFAULT_DATA;
    }
  });
  const [admin, setAdmin] = useState(false);
  const [modal, setModal] = useState(null);
  const [done, setDone] = useState({});
  const day = Math.floor((Date.now() - new Date(data.dep)) / 864e5);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setAdmin(params.get('admin') === '1');
  }, []);

  const save = next => {
    setData(next);
    localStorage.setItem('entre-nos-config', JSON.stringify(next));
    alert('Alterações salvas neste dispositivo!');
  };

  const closeModal = () => setModal(null);
  const openTab = nextTab => {
    setTab(nextTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let content;
  if (tab === 'home') content = <Home data={data} />;
  if (tab === 'cartas') content = <Letters data={data} day={day} onOpen={setModal} />;
  if (tab === 'mem') content = <Memories data={data} onOpen={setModal} />;
  if (tab === 'enq') content = <WhileAway data={data} day={day} done={done} setDone={setDone} />;
  if (tab === 'pl') content = <Playlist data={data} />;
  if (tab === 'tm') content = <Timeline data={data} />;
  if (tab === 'adm') content = <Admin data={data} onSave={save} />;

  if (!entered) return <Gate onEnter={() => setEntered(true)} />;

  return (
    <>
      <DecorativePetals />
      <Navigation tabs={TABS} admin={admin} currentTab={tab} onSelect={openTab} />
      <main className="wrap" key={tab}>{content}</main>
      {modal && <ContentModal modal={modal} data={data} day={day} onClose={closeModal} />}
    </>
  );
}
