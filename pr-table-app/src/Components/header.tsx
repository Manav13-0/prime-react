import { OverlayPanel } from 'primereact/overlaypanel';

type Props = {
  selectCount: number;
  setSelectCount: (val: number) => void;
  totalRecords: number;
  handleSelectNRows: () => void;
  overlayRef: React.RefObject<OverlayPanel>;
};

export const TitleHeader = ({
  selectCount,
  setSelectCount,
  totalRecords,
  handleSelectNRows,
  overlayRef,
}: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <i
        className="pi pi-chevron-down cursor-pointer"
        onClick={(e) => overlayRef.current?.toggle(e)}
      />
      <span className="ml-2"> Title</span>

      <OverlayPanel ref={overlayRef}>
        <input
          type="number"
          className="custom-input"
          value={selectCount === 0 ? '' : selectCount}
          placeholder="Enter value"
          min={1}
          max={totalRecords}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setSelectCount(val);
            else setSelectCount(0);
          }}
        />
        <button onClick={handleSelectNRows} className="custom-button mt-3">
          Select
        </button>
      </OverlayPanel>

    </div>
  );
};