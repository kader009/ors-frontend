interface TableRowSkeletonProps {
  rows?: number;
  renderRows: () => React.ReactNode;
}

const TableRowSkeleton = ({ rows = 5, renderRows }: TableRowSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>{renderRows()}</tr>
      ))}
    </>
  );
};

export default TableRowSkeleton;
