export default function Navigation({ tabs, admin, currentTab, onSelect }) {
  const visibleTabs = admin ? [...tabs, ['adm', 'Admin']] : tabs;

  return (
    <nav>
      {visibleTabs.map(([id, label]) => (
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
