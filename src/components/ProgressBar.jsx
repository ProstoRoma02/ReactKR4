const ProgressBar = ({
  progress,
  color = '#2563eb',
  height = 12,
  showLabel = true,
  animated = true,
}) => (
  <div className="progress-wrapper" aria-valuenow={progress} role="progressbar" aria-valuemin="0" aria-valuemax="100">
    <div className="progress-track" style={{ height }}>
      <div
        className={`progress-inner ${animated ? 'progress-animated' : ''}`}
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </div>
    {showLabel && <span className="progress-label">{progress}%</span>}
  </div>
);

export default ProgressBar;

