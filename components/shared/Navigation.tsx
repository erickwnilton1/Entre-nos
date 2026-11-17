import type { AppTab } from './types';

type NavigationProps = {
  tabs: readonly (readonly [AppTab, string])[];
  currentTab: AppTab;
  onSelect: (tab: AppTab) => void;
};

export default function Navigation({ tabs, currentTab, onSelect }: NavigationProps) {
  return (
    <nav>
      {tabs.map(([id, label]) => (
        <button
          key={id}
          className={currentTab === id ? 'active' : ''}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
