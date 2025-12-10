const QuickActions = ({ onCompleteAll, onResetAll, onExport }) => (
  <div className="quick-actions">
    <button type="button" className="secondary-button" onClick={onCompleteAll}>
      Отметить все как выполненные
    </button>
    <button type="button" className="secondary-button" onClick={onResetAll}>
      Сбросить статусы
    </button>
    <button type="button" className="secondary-button" onClick={onExport}>
      Экспортировать JSON
    </button>
  </div>
);

export default QuickActions;

